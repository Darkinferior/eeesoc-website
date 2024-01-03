import { Image } from '@nextui-org/react';
import { Reveal } from '../Reveal';

interface Workshop {
  _id: string;
  title: string;
  cardImage: string;
  contentImage: string;
  content: string;
}

interface Props {
  workshop: Workshop;
  index: number;
}

export default function WorkshopItem({ workshop, index }: Props) {
  return (
    <div className="grid items-center grid-cols-2 gap-20 xl:flex-row my-16">
      <div
        className={`${
          index % 2 === 0
            ? 'order-first text-start'
            : 'text-start order-first xl:order-last'
        } col-span-2 xl:col-span-1`}
      >
        <Reveal>
          <h2 className="mb-3 text-4xl font-bold">{workshop.title}</h2>
        </Reveal>
        <Reveal>
          <div className="text-justify text-xl">{workshop.content}</div>
        </Reveal>
      </div>

      <div
        className={`${
          index % 2 === 0
            ? 'order-first xl:order-last'
            : 'order-first xl:order-first'
        } col-span-2 xl:col-span-1`}
      >
        <Image
          isBlurred
          isZoomed
          src={workshop.cardImage}
          alt={workshop.title}
          width={648}
          height={365}
          className="object-contain mx-auto rounded aspect-video"
        />
      </div>
    </div>
  );
}
