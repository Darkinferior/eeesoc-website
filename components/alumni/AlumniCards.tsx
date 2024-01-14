import { Card, CardHeader } from '@nextui-org/react';
import AlumniCard from './AlumniCard';
import { Reveal } from '../Reveal';

interface Alumni {
  _id: string;
  name: string;
  workplace?: string;
  position?: string;
  image: string;
  linkedinUrl?: string;
}

interface BatchAlumni {
  _id: string;
  year: number;
  alumni: Alumni[];
}

interface AlumniCardsProps {
  batchWiseAlumni: BatchAlumni;
}
const lastTwoDigits = (year: number) => {
  return year % 100;
};
const AlumniCards: React.FC<AlumniCardsProps> = ({ batchWiseAlumni }) => {
  return (
    <>
      <Card
        isBlurred
        shadow="sm"
        className="border-none bg-background/60 dark:bg-default-100/50 w-full mt-16 mb-16 transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50"
      >
        <CardHeader className="text-4xl font-bold justify-center mt-8 mb-8">
          <Reveal> K&apos;{lastTwoDigits(batchWiseAlumni.year)} </Reveal>
        </CardHeader>
        <div className="flex flex-wrap items-center justify-center w-full">
          {batchWiseAlumni.alumni.map((senior) => (
            <AlumniCard
              key={senior._id}
              senior={senior}
              year={batchWiseAlumni.year}
            />
          ))}
        </div>
      </Card>

      <div className="mt-10 divider divider-small"></div>
    </>
  );
};

export default AlumniCards;
