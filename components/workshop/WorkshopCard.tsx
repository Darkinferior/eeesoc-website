import { Image } from '@nextui-org/react';

interface Workshop {
  _id: string;
  title: string;
  cardImage: string;
  contentImage: string;
  content: string;
}
interface Props {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: Props) {
  return (
    <div className="flex flex-col items-center col-span-3 py-6 sm:col-span-1 shadow-container">
      <Image
        src={workshop.cardImage}
        alt={workshop.title + ' thumbnail'}
        className="object-contain w-3/4 h-full aspect-square"
        width={200}
        height={200}
      />
      <h4 className="mt-4">{workshop.title}</h4>
    </div>
  );
}
