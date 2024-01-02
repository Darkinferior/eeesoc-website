'use client';
import { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import WorkshopItem from '@/components/workshop/WorkshopItem';
import { Fragment } from 'react';
import { Spinner } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import { Reveal } from '@/components/Reveal';

export default function WorkshopPage() {
  const [workshopsList, setWorkshopsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/workshops')
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
          <p className="mt-4 justify-center items-center text-lg">
            The society aims in imparting branch-specific technical knowledge to
            the students of EEE. We conduct various workshops related to various
            fields of Electrical Engineering such as MATLAB, SIMULINK, Machine
            Learning, and Image processing workshop.
          </p>
        </Reveal>
      </section>
      <Divider className="mt-8" />

      <div className="flex flex-col gap-5 pb-20">
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <div className="flex flex-col gap-5 pb-20">
            {workshopsList.map((workshop, index) => (
              <Fragment key={workshop._id}>
                <WorkshopItem index={index} workshop={workshop} />

                {index !== workshopsList.length - 1 && <Divider />}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
