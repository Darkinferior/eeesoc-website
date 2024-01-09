'use client';
import { title } from '@/components/primitives';
import {
  Card,
  CardBody,
  Link,
  Image,
  Button,
  Divider,
} from '@nextui-org/react';
import CompanySlider from '@/components/sponsor/CompanySlider';
import { siteConfig } from '@/config/site';
import { Reveal } from '@/components/Reveal';
import VertialTimeline from '@/components/sponsor/VertialTimeline';

const SponsorPage = () => {
  return (
    <div>
      <h1 className={title()}>Sponsor Us!</h1>
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
                src="https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?q=80&w=1832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 justify-end items-end">
              <div className="flex flex-col gap-0">
                <Reveal>
                  <p className="text-lg text-justify">
                    The Electrical & Electronics (EEE) Society of Birla
                    Institute of Technology (BIT) Mesra is a student
                    organization that aims to promote the study and application
                    and technical growth and overall development of the students
                    of BIT Mesra. The society has a strong track record of
                    organizing events and workshops, and has a membership of
                    over 1,000 students. Having a sponsorship with EEESoc allows
                    our sponsors to increase their Brand Visibility by
                    participating in several institutional events such as
                    Bitotsav and Pantheon. Also, we highlight our sponsors on
                    our official merch, events and workshops.
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
      </Card>{' '}
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
              To tap into the latest research and innovations: The EEE Society
              is known for its active research and innovation culture. By
              collaborating with our Society, companies can gain access to the
              latest research and innovations in the field of engineering.
            </li>
            <li className="my-4">
              To build brand awareness and goodwill: A collaboration with the
              EEE Society can help companies build brand awareness and goodwill
              among the engineering community.
            </li>
            <li className="my-4">
              Access to a talented pool of students: EEESoc serves as a talent
              pool for the brightest minds in electrical and electronic
              engineering. Sponsoring us provides your organization with direct
              access to a network of motivated and skilled individuals who could
              be the future leaders of the industry.
            </li>
            <li className="my-4">
              Opportunity to give back to the community: By collaborating with
              the EEE Society, companies can give back to the engineering
              community and help to develop the next generation of engineers.
              Through a dynamic partnership with our Society, forward-thinking
              companies can play a pivotal role in nurturing student potential
              and contributing to the cultivation of a highly skilled and
              exceptionally qualified workforce.
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
        <CompanySlider />
      </div>
      <div className="mt-8 mb-8">
        <VertialTimeline />
      </div>
    </div>
  );
};

export default SponsorPage;
