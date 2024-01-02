// page.tsx
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
        const response = await fetch('http://localhost:3000/api/projects');
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
            In collaboration with Mathworks, the Society conducts two major
            project programmes for First and Second-year students in every
            academic session. They are mentored by their seniors who constantly
            monitor the progress and provide technical guidance. Some of the
            best projects done by EEE students have, in fact, been done under
            the umbrella of these project programmes, for some years now these
            projects have filled the resumes of some of the best-placed students
            in our department. Many of these projects had not been attempted
            before and the knowledge that has been accumulated through research
            and hard work is being passed on to the juniors too.
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
