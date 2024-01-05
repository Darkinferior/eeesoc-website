import { Card, CardHeader, CardBody, Image, Link } from '@nextui-org/react';

import { Reveal } from '../Reveal';

interface InterviewCardProps {
  title: string;
  link: string;
  image: string;
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  title,
  link,
  image,
}) => {
  return (
    <Card className="w-full sm:w-auto md:w-auto lg:w-auto  py-4 items-center justify-center mb-8 transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50">
      <CardHeader className="pb-0 pt-2 px-4 flex-col">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={600}
          height={800}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-4 py-2 items-center justify-center">
        <Reveal>
          <h4 className="font-bold text-xl">{title}</h4>
        </Reveal>
        <Reveal>
          <Link
            className="px-2 py-4 "
            color="foreground"
            isExternal
            href={link}
            showAnchorIcon
          >
            Read Full Interview on Medium
          </Link>
        </Reveal>
      </CardBody>
    </Card>
  );
};

export default InterviewCard;
