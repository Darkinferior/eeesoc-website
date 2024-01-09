'use client';
import { Card, CardBody, Image } from '@nextui-org/react';
import { Reveal } from '../Reveal';

export const AboutDescription = () => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full mt-16 mb-16 transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              isZoomed
              alt="Team Photo"
              className="object-cover"
              height={200}
              shadow="md"
              src="https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704819522/home/bit_mesra.jpg"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <Reveal>
                  <p className="text-lg text-justify">
                    Welcome to EEESoc, the Electrical and Electronic Engineering
                    Society at Birla Institute of Technology - Mesra. Founded in
                    2013 with a vision to cultivate innovation, collaboration,
                    and excellence in the realm of electrical and electronic
                    engineering, EEESoc has been dedicated to advancing these
                    principles over the years, EEESoc is a dynamic community
                    that brings together students, faculty, and industry
                    professionals passionate about advancing technology and
                    shaping the future. EEESoc organizes practical workshops,
                    SPP(Summer Project Program) and SMP(Student Mentorship
                    Program) to ensure that our members can apply their
                    knowledge in real-world scenarios.Explore the possibilities
                    with EEESoc, where innovation meets inspiration.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
