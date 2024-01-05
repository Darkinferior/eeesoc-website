'use client';
import { useEffect, useState } from 'react';
import { title } from '@/components/primitives';
import { TeamCard } from '@/components/team/TeamCard';
import { Spinner } from '@nextui-org/spinner';

interface Member {
  _id: string;
  name: string;
  image: string;
  designation: string;
  linkedinUrl: string;
}
export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTeamMembers = async (year: string) => {
      try {
        const response = await fetch(`/api/executiveBody?year=${year}`);
        const data = await response.json();
        return data.result as Member[];
      } catch (error: any) {
        console.error(
          `Error fetching Team Members for year ${year}:`,
          error.message
        );
        return [];
      }
    };

    const fetchData = async () => {
      const membersK20 = await fetchTeamMembers('k20');
      const membersK21 = await fetchTeamMembers('k21');

      setMembers([...membersK20, ...membersK21]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className={title()}>Our Team</h1>
      {loading ? (
        <div className="items-center justify-center mt-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {members.map((member) => {
            console.log('Image URL:', member.image);

            return (
              <TeamCard
                key={member._id}
                name={member.name}
                position={member.designation}
                imageUrl="https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fseniors%2Fk19%2Fakshat_bhaiya_k19.jpg&w=384&q=75" //replace with {member.image}
                linkedinUrl={member.linkedinUrl}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
