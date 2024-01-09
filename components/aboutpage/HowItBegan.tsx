'use client';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Reveal } from '../Reveal';

export const HowItBegan = () => {
  return (
    <Card className="py-4 w-full lg:w-7/12 xl:w-7/12 transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50 ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Reveal>
          <h4 className="font-bold text-2xl">How it all began?</h4>
        </Reveal>
      </CardHeader>
      <CardBody className="overflow-visible py-2 text-lg text-justify">
        <Reveal>
          <p>
            EEESoc was founded in 2013 with a dedication to imparting profound
            technical wisdom to aspiring minds within the realm of Electrical
            and Electronic Engineering (EEE), catering not only to students
            within the EEE discipline but also welcoming enthusiasts from other
            branches.
          </p>
        </Reveal>
        <br />
        <Reveal>
          <p>
            The first president of the society was Jaivardhan Shivam under the
            guidance of Dr. T. Ghose and the faculty advisor Dr. R.C. Jha.
          </p>
        </Reveal>
      </CardBody>
    </Card>
  );
};
