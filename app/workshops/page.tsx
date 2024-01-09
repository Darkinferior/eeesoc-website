'use client';
import { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import WorkshopItem from '@/components/workshop/WorkshopItem';
import { Fragment } from 'react';
import { Spinner, Divider } from '@nextui-org/react';
import { Reveal } from '@/components/Reveal';

export default function WorkshopPage() {
  const [workshopsList, setWorkshopsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/workshops')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWorkshopsList(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching workshops:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="items-stretch wrapper">
      <section>
        <h1 className={title()}>Workshops</h1>
        <Reveal>
          <p className="mt-4 justify-center items-center text-lg text-justify">
            As part of the society&apos;s mission, students of the EEE
            department and enthusiasts will be given branch-specific technical
            knowledge. A variety of workshops are conducted on MATLAB,
            Micro-controllers like Arduino and Raspberry Pi Pico, Basic of AI &
            ML, PCB Design and Power Converter Design and many more. Thus,
            providing a deeper understanding of Electrical and Electronic
            Engineering.
          </p>
        </Reveal>
      </section>
      <Divider className="mt-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />

      <div className="flex flex-col gap-5 pb-20">
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <div className="flex flex-col gap-5 pb-20">
            {workshopsList.map((workshop, index) => (
              <Fragment key={workshop._id}>
                <WorkshopItem index={index} workshop={workshop} />

                {index !== workshopsList.length - 1 && (
                  <Divider className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
