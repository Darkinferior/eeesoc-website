'use client';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
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
              src="data:image/jpeg;base64,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"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <Reveal>
                  <p className="text-lg text-justify">
                    The Department of Electrical & Electronics Engineering is
                    dedicated to the current needs of industry with the
                    flexibility to tune its programs according to different
                    requirements. The application of new technology in various
                    fields is one of the main focuses on the activities of the
                    department. Department of EEE has recently received grants
                    amounting to Rs. 2.7 Crore from UGC, DST, AICTE, CDAC,
                    TEQIP, etc. to strengthen the research facility for the
                    development in the design and development of lightning
                    protection systems, etc. The domain of Smart Grid, Energy
                    Efficient Electrical Motor Drives, Department of EEE has
                    MoUs with the University of Padova, Italy and with other
                    Industries.
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
