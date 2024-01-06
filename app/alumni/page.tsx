'use client';
import { useState, useEffect } from 'react';
import AlumniCards from '@/components/alumni/AlumniCards';
import { title } from '@/components/primitives';

interface Alumni {
  _id: string;
  name: string;
  workplace?: string;
  position?: string;
  image: string;
  linkedinUrl?: string;
}

export default function AlumniPage() {
  const [alumniData, setAlumniData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/alumni');
        const data = await response.json();
        console.log(data.result);
        setAlumniData(data.result);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1 className={title()}>Alumni</h1>
      <div className="mt-16 mb-16">
        {alumniData.map((batchWiseAlumni) => (
          <AlumniCards
            key={batchWiseAlumni._id}
            batchWiseAlumni={batchWiseAlumni}
          />
        ))}
      </div>
    </div>
  );
}