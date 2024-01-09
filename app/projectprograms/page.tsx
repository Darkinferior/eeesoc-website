'use client';
import { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import ProgramCard from '@/components/projectprogram/ProgramCard';
import { Spinner } from '@nextui-org/react';
import { Reveal } from '@/components/Reveal';

interface Project {
  _id: string;
  name: string;
  title: string;
  description: string;
  reportLink?: string | null;
  githubLink?: string | null;
  demoLink?: string | null;
  image: string;
}

interface YearWiseProject {
  _id: string;
  year: number;
  projects: Project[];
}

interface Program {
  _id: string;
  type: string;
  year: number;
  title: string;
  description: string;
  yearWiseProjects: YearWiseProject[];
}

interface ProjectListResponse {
  ProjectList: Program[];
}

export default function ProjectProgramPage() {
  const [sppProjects, setSppProjects] = useState<YearWiseProject[]>([]);
  const [smpProjects, setSmpProjects] = useState<YearWiseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [programData, setProgramData] = useState<ProjectListResponse | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/projects');
        const data: ProjectListResponse = await response.json();

        setProgramData(data);

        const sppProjectList = data.ProjectList.find(
          (item) => item.type === 'SPP'
        );

        const smpProjectList = data.ProjectList.find(
          (item) => item.type === 'SMP'
        );

        if (sppProjectList) {
          setSppProjects(sppProjectList.yearWiseProjects || []);
        } else {
          console.error('SPP projects not found in the data.');
        }

        if (smpProjectList) {
          setSmpProjects(smpProjectList.yearWiseProjects || []);
        } else {
          console.error('SMP projects not found in the data.');
        }
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        setError(`Error fetching projects: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner size="lg" className="mt-64" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className={title()}>Project Programs</h1>
      <div>
        <Reveal>
          <h2 className="mt-16 text-lg text-justify">
            The society conducts 2 major project programs Summer Project Program
            (SPP) and Summer Mentorship Program (SMP) for First and Second-year
            students in every academic session. In these programs they get
            technical guidance from their seniors. In these programmes/projects
            there are projects related to electric core, software and
            consultancy. These projects have filled the resumes of some of the
            best-placed students in our department.
          </h2>
        </Reveal>
      </div>

      <div>
        <ProgramCard
          yearWiseProjects={sppProjects}
          type="SPP"
          description={
            programData?.ProjectList.find((item) => item.type === 'SPP')
              ?.description || ''
          }
        />
        <ProgramCard
          yearWiseProjects={smpProjects}
          type="SMP"
          description={
            programData?.ProjectList.find((item) => item.type === 'SMP')
              ?.description || ''
          }
        />
      </div>
    </div>
  );
}
