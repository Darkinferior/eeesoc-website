'use client';

import { title } from '@/components/primitives';
import { useState, useEffect } from 'react';
import InterviewCard from '@/components/interviews/InterviewCard';
import { Spinner } from '@nextui-org/react';

interface Interviews {
  _id: string;
  name: string;
  company: string;
  image: string;
  mediumLink?: string;
}

interface ApiResponse {
  _id: string;
  year: string;
  interviews: Interviews[];
}
const lastTwoDigits = (year: number) => {
  return year % 100;
};

export default function InterviewsPage() {
  const [apiData, setApiData] = useState<ApiResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions: RequestInit = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch('/api/interviewsAll', requestOptions);

        if (response.ok) {
          const resultJson = await response.json();
          setApiData(resultJson.result);
        } else {
          console.error(
            'Error fetching data:',
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className={title()}>Interviews</h1>
      <div className="mt-16 ">
        {apiData !== null ? (
          <div className="m-6">
            {apiData.map((yearWiseInterviews) => (
              <div key={yearWiseInterviews._id} className="mt-8 mb-8">
                <h3 className="font-bold text-4xl mb-8">
                  K&apos;{lastTwoDigits(parseInt(yearWiseInterviews.year))}
                </h3>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                  {yearWiseInterviews.interviews.map(
                    (interview: Interviews) => (
                      <InterviewCard
                        key={interview._id}
                        title={interview.company}
                        link={interview.mediumLink ? interview.mediumLink : ''}
                        image={interview.image ? interview.image : ''}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Spinner size="lg" className="mt-32" />
        )}
      </div>
    </div>
  );
}
