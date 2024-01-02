'use client';
import { title } from '@/components/primitives';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import InterviewCard from '@/components/interviews/InterviewCard';
import { Spinner } from '@nextui-org/react';

interface ApiResponse {
  title: string;
  link: string;
  content: string;
}

export default function InterviewsPage() {
  const [apiData, setApiData] = useState<ApiResponse[] | null>(null);

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
        const response = await fetch(
          'https://v1.nocodeapi.com/cropoder/medium/lMTiDFdrQqoikOOI',
          requestOptions
        );

        if (response.ok) {
          const resultJson: ApiResponse[] = await response.json();
          setApiData(resultJson);
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
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {apiData.map((item, index) => {
              const sanitizedContent =
                item.content && DOMPurify.sanitize(item.content);
              const parser = new DOMParser();
              const doc = parser.parseFromString(
                sanitizedContent || '',
                'text/html'
              );
              const imageElement = doc.querySelector('img');

              return (
                <InterviewCard
                  key={index}
                  title={item.title}
                  link={item.link}
                  image={imageElement ? imageElement.src : ''}
                />
              );
            })}
          </div>
        ) : (
          <Spinner size="lg" className="mt-32" />
        )}
      </div>
    </div>
  );
}
