'use client';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Reveal } from '../Reveal';

interface President {
  _id: string;
  tenure: string;
  name: string;
}

export const PresidentCard = () => {
  const [presidents, setPresidents] = useState<President[]>([]);

  useEffect(() => {
    const fetchPresidents = async () => {
      try {
        const response = await fetch('/api/presidents');
        const data = await response.json();
        const sortedData = data.result.sort(
          (a: any, b: any) =>
            parseInt(b.tenure.split('-')[0]) - parseInt(a.tenure.split('-')[0])
        );

        setPresidents(sortedData.slice(0, 8) as President[]);
      } catch (error: any) {
        console.error('Error fetching presidents:', error.message);
      }
    };

    fetchPresidents();
  }, []);

  const paragraphs = presidents.map((president) => (
    <li key={president._id}>{` ${president.tenure}: ${president.name}`}</li>
  ));

  return (
    <Card
      isHoverable
      className="py-4 w-full lg:w-4/12 xl:w-4/12 transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50 "
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Reveal>
          <h4 className="font-bold text-2xl">Our Presidents</h4>
        </Reveal>
      </CardHeader>
      <Reveal>
        <CardBody className="overflow-visible py-2 text-lg">
          {paragraphs}
        </CardBody>
      </Reveal>
    </Card>
  );
};
