// DevelopmentCard.tsx

import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Reveal } from '../Reveal';

interface DevelopmentCardProps {
  title: string;
  bulletPoints: string[];
}

export const MotiveCard: React.FC<DevelopmentCardProps> = ({
  title,
  bulletPoints,
}) => {
  return (
    <Card className="w-full sm:w-1/2 lg:w-1/3 xl:w-5/12 items-center py-4 px-4 justify-center mx-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Reveal>
          <h4 className="font-bold text-xl">{title}</h4>
        </Reveal>
      </CardHeader>
      <CardBody className="overflow-visible py-2 text-lg">
        <ul className="list-disc">
          {bulletPoints.map((point, index) => (
            <li key={index}>
              <Reveal>{point}</Reveal>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};
