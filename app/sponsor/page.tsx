'use client';
import { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import {
  Card,
  CardBody,
  Link,
  Image,
  Button,
  Divider,
  Spinner,
} from '@nextui-org/react';
import CompanySlider from '@/components/sponsor/CompanySlider';
import { siteConfig } from '@/config/site';
import { Reveal } from '@/components/Reveal';
import VertialTimeline from '@/components/sponsor/VertialTimeline';

interface SponsorData {
  _id: string;
  content: string;
  image: string;
  __v: number;
}

const SponsorPage = () => {
  const [loading, setLoading] = useState(true);
  const [sponsorData, setSponsorData] = useState<SponsorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sponsorUs');
        const { data } = await response.json();

        if (data.length > 0) {
          setSponsorData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching sponsor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <div>
      <h1 className={title()}>Sponsor Us!</h1>
      {sponsorData && (
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full mt-16 mb-16 transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50 "
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center px-4 py-4">
              <div className="relative col-span-6 ">
                <Image
                  isZoomed
                  alt="Team Photo"
                  className="object-cover aspect-video"
                  height="100%"
                  shadow="md"
                  src={sponsorData.image}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 justify-end items-end">
                <div className="flex flex-col gap-0">
                  <Reveal>
                    <p className="text-lg text-justify">
                      {sponsorData.content}
                    </p>
                  </Reveal>
                </div>

                <div className="w-6/12 mt-2">
                  <Button
                    as={Link}
                    href={siteConfig.links.email}
                    className="font-bold text-xl text-white transform hover:scale-105 transition-transform bg-cyan-500 shadow-lg shadow-cyan-500/50"
                    fullWidth
                    size="lg"
                  >
                    Sponsor Us
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      <Divider className="my-4 h-1 bg-cyan-500" />
      <div className="mt-8 ">
        <div className="flex items-center justify-center">
          <Reveal>
            <h1 className="font-bold text-4xl text-center">Why Sponsor Us</h1>
          </Reveal>
        </div>
        <Reveal>
          <div className="text-justify mt-8 text-lg ">
            <li className="my-4">
              <strong>To tap into the latest research and innovations:</strong>{' '}
              The EEE Society is known for its active research and innovation
              culture. By collaborating with our Society, companies can gain
              access to the latest research and innovations in the field of
              engineering.
            </li>
            <li className="my-4">
              <strong>To build brand awareness and goodwill:</strong> A
              collaboration with the EEE Society can help companies build brand
              awareness and goodwill among the engineering community.
            </li>
            <li className="my-4">
              <strong>Access to a talented pool of students:</strong> EEESoc
              serves as a talent pool for the brightest minds in electrical and
              electronic engineering. Sponsoring us provides your organization
              with direct access to a network of motivated and skilled
              individuals who could be the future leaders of the industry.
            </li>
            <li className="my-4">
              <strong>Opportunity to give back to the community:</strong> By
              collaborating with the EEE Society, companies can give back to the
              engineering community and help to develop the next generation of
              engineers. Through a dynamic partnership with our Society,
              forward-thinking companies can play a pivotal role in nurturing
              student potential and contributing to the cultivation of a highly
              skilled and exceptionally qualified workforce.
            </li>
          </div>
        </Reveal>
      </div>
      <Divider className="my-4 h-1 bg-cyan-500" />
      <div className="mt-16 mb-16">
        <div className="flex items-center justify-center">
          {' '}
          <Reveal>
            <h1 className="font-bold text-4xl text-center mb-8">
              Our Placements
            </h1>
          </Reveal>
        </div>
        <div
          className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md max-w-md overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0)',
          }}
        >
          <CompanySlider />
        </div>
      </div>
      <div className="mt-8 mb-8">
        <VertialTimeline />
      </div>
    </div>
  );
};

export default SponsorPage;
