'use client';
import { useEffect, useState } from 'react';
import { title } from '@/components/primitives';
import { Card, CardHeader } from '@nextui-org/card';
import { MentorCard } from '../../components/aboutpage/MentorCard';
import { PresidentCard } from '../../components/aboutpage/PresidentCard';
import { HowItBegan } from '../../components/aboutpage/HowItBegan';
import { AboutDescription } from '../../components/aboutpage/AboutDescription';
import { MotiveCard } from '../../components/aboutpage/MotiveCard';

interface Mentor {
  _id: string;
  tenure: string;
  name: string;
  image: string;
  profileLink: string;
  designation: string;
  department: string;
  areasOfInterest: string[];
}

export default function AboutPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  const academicBulletPoints = [
    'Project Programs for first and second year students',
    'EEESoc Sessions',
    'Workshops',
  ];

  const personalBulletPoints = [
    'Interviews of final year students',
    'Pantheon & Bitotsav Events',
    'Induction programs for new batches',
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('/api/mentors');
        const data = await response.json();
        setMentors(data.result as Mentor[]);
      } catch (error: any) {
        console.error('Error fetching presidents:', error.message);
      }
    };

    fetchMentors();
  }, []);

  const mentorCards = mentors.map((mentor) => (
    <MentorCard
      key={mentor._id}
      name={mentor.name}
      position={mentor.designation}
      department={mentor.department}
      imageUrl={mentor.image}
      bitUrl={mentor.profileLink}
      areasOfInterest={mentor.areasOfInterest.join(', ')}
    />
  ));
  return (
    <div>
      <h1 className={title()}>About</h1>

      <AboutDescription />

      <div className="mt-16 mb-16 mx-auto flex-wrap flex gap-12 justify-center">
        <HowItBegan />
        <PresidentCard />
      </div>
      <div>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full mt-16 mb-16 justify-center py-4 transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50 "
          shadow="sm"
        >
          <CardHeader className="px-4 flex-col mt-8 mb-8">
            <h4 className="font-bold text-2xl">Our Motive</h4>
          </CardHeader>
          <div className="flex flex-auto gap-12 justify-center flex-wrap">
            <MotiveCard
              title="For Academic Development"
              bulletPoints={academicBulletPoints}
            />
            <MotiveCard
              title="For Personal Development"
              bulletPoints={personalBulletPoints}
            />
          </div>
        </Card>
      </div>
      <h4 className="font-bold text-2xl mt-16 mb-16">Our Mentors</h4>
      <div className="flex flex-auto gap-16 justify-center flex-wrap">
        {mentorCards}
      </div>
    </div>
  );
}
