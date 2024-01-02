import React from 'react';
import { Image } from '@nextui-org/image';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Reveal } from '../Reveal';

interface TeamCardProps {
  name: string;
  position: string;
  imageUrl: string;
  linkedinUrl: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  position,
  imageUrl,
  linkedinUrl,
}) => {
  return (
    <>
      <Card className="sm:w-auto md:w-auto lg:w-auto justify-center ms-center transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center mt-4 mb-2">
          <Image
            isBlurred
            isZoomed
            alt={`${name}'s profile picture`}
            className="object-cover rounded-full aspect-square"
            radius="full"
            src={imageUrl}
            width={800}
            height={800}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center text-center">
          <Link isExternal href={linkedinUrl} color="foreground">
            <Reveal>
              <h4 className="font-bold text-xl">{name}</h4>
            </Reveal>
          </Link>
          <Reveal>
            {' '}
            <div className="mt-2 text-lg">{position}</div>
          </Reveal>
        </CardBody>
      </Card>
    </>
  );
};
