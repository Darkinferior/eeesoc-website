'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '../Reveal';

interface CardProps {
  card: {
    url: string;
    title: string;
    id: number;
  };
}

const Carousal: React.FC = () => {
  return (
    <div>
      <div className="flex h-48 items-center justify-center">
        <Reveal>
          <span className="font-semibold uppercase text-neutral-500">
            Scroll down
          </span>
        </Reveal>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <Reveal>
          <span className="font-semibold uppercase text-neutral-500">
            Scroll up
          </span>
        </Reveal>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
    </div>
  );
};

const cards = [
  {
    url: 'https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fgallery%2F0.jpeg&w=640&q=75',
    title: 'Title 1',
    id: 1,
  },
  {
    url: 'https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fgallery%2F1.jpeg&w=640&q=75',
    title: 'Title 2',
    id: 2,
  },
  {
    url: 'https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fgallery%2F2.jpeg&w=640&q=75',
    title: 'Title 3',
    id: 3,
  },
  {
    url: 'https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fgallery%2F3.jpeg&w=640&q=75',
    title: 'Title 4',
    id: 4,
  },
  {
    url: 'https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fgallery%2F4.jpeg&w=640&q=75',
    title: 'Title 5',
    id: 5,
  },
  {
    url: 'https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fgallery%2F5.jpeg&w=640&q=75',
    title: 'Title 6',
    id: 6,
  },
  {
    url: 'https://www.eeesocbit.com/_next/image?url=%2Fimages%2Fgallery%2F6.jpeg&w=640&q=75',
    title: 'Title 7',
    id: 7,
  },
];

export default Carousal;
