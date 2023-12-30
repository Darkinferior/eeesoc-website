import { Card, CardBody, CardHeader } from '@nextui-org/react';
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
  batchWiseAlumni: BatchAlumni; // Prop to receive the batch-wise alumni data
}
const lastTwoDigits = (year: number) => {
  return year % 100;
};
const AlumniCards: React.FC<AlumniCardsProps> = ({ batchWiseAlumni }) => {
  return (
    <>
      <Card isBlurred className="w-full mt-10">
        <CardHeader className="text-4xl font-bold justify-center">
          <Reveal> K&apos;{lastTwoDigits(batchWiseAlumni.year)} </Reveal>
        </CardHeader>
        <div className="flex flex-wrap items-center justify-center w-full">
          {batchWiseAlumni.alumni.map((senior) => (
            <AlumniCard
              key={batchWiseAlumni._id}
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
