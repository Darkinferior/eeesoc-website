// ProgramCard.tsx
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import ProjectCard from '@/components/projectprogram/ProjectCard';
import { Tabs, Tab } from '@nextui-org/react';
import { Reveal } from '../Reveal';

interface ProjectCardProps {
  name: string;
  title: string;
  image: string;
  description: string;
  reportLink?: string | null;
  githubLink?: string | null;
  demoLink?: string | null;
}

interface YearWiseProject {
  _id: string;
  year: number;
  projects: ProjectCardProps[];
}

interface ProgramCardProps {
  yearWiseProjects: YearWiseProject[];
  type: string;
  description: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  yearWiseProjects,
  type,
  description,
}) => {
  const heading =
    type === 'SPP' ? 'Summer Project Program' : 'Summer Mentorship Program';

  const sortedProjects = yearWiseProjects
    .slice()
    .sort((a, b) => b.year - a.year);
  return (
    <Card className="py-4 px-8 mt-8 mb-8 text-center items-center justify-center">
      <CardHeader className="pb-0 pt-2 px-4 flex-col">
        <Reveal>
          <h4 className="font-bold text-4xl mb-4">{heading}</h4>
        </Reveal>
      </CardHeader>
      <CardBody className="overflow-visible my-4 text-start text-xl">
        <Reveal>{description}</Reveal>
        <div>
          {sortedProjects.length > 0 && (
            <Tabs
              aria-label={`${type} Projects`}
              className="flex justify-center mt-8"
            >
              {sortedProjects.map((yearWiseProject) => (
                <Tab
                  key={yearWiseProject.year}
                  title={`${yearWiseProject.year}`}
                  className="items-center justify-center  "
                >
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-4 ">
                    {yearWiseProject.projects.map((project, index) => (
                      <ProjectCard key={index} {...project} />
                    ))}
                  </div>
                </Tab>
              ))}
            </Tabs>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProgramCard;
