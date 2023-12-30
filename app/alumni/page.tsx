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
  const [alumniData, setAlumniData] = useState([]);

  useEffect(() => {
    // Fetch alumni data from the API
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

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className="wrapper">
      <h1 className={title()}>Alumni</h1>
      {/* Render AlumniCards component with fetched alumniData */}
      {alumniData.map((batchWiseAlumni) => (
        <AlumniCards
          key={batchWiseAlumni._id}
          batchWiseAlumni={batchWiseAlumni}
        />
      ))}
    </div>
  );
}
