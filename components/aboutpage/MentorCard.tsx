// MentorCard.tsx

import React from 'react';
import { Image } from '@nextui-org/image';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Reveal } from '../Reveal';

interface MentorCardProps {
  name: string;
  position: string;
  department: string;
  imageUrl: string;
  bitUrl: string;
  areasOfInterest: string;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  name,
  position,
  department,
  imageUrl,
  bitUrl,
  areasOfInterest,
}) => {
  return (
    <Card className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 justify-center ms-center transform hover:scale-105 transition-transform">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center mt-4 mb-2">
        <Image
          alt="Card background"
          className="object-cover rounded-full aspect-square"
          src={imageUrl}
          width={270}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 items-center">
        <Link isExternal href={bitUrl} showAnchorIcon color="foreground">
          <Reveal>
            <h4 className="font-bold text-lg">{name}</h4>
          </Reveal>
        </Link>
        <Reveal>
          <div className="mt-2 text-md">{position}</div>
        </Reveal>
        <Reveal>
          <div className="text-md">{department}</div>
        </Reveal>
        <Reveal>
          <p className="mt-4 text-md">
            <strong>Areas of interest: </strong>
            {areasOfInterest}
          </p>
        </Reveal>
      </CardBody>
    </Card>
  );
};

export default MentorCard;
