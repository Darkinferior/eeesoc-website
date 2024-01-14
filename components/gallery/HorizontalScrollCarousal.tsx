'use client';
import { useEffect, useState } from 'react';
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
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('/api/cards')
      .then((response) => response.json())
      .then((data) => setCards(data.cards))
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);
  return (
    <div>
      <div className="flex h-48 items-center justify-center">
        <Reveal>
          <span className="font-semibold uppercase text-neutral-500">
            Scroll down
          </span>
        </Reveal>
      </div>
      <HorizontalScrollCarousel cards={cards} />

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

const HorizontalScrollCarousel: React.FC<{ cards: any[] }> = ({ cards }) => {
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
            return <Card card={card} key={card._id} />;
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
      className="group relative h-[450px] w-[600px] overflow-hidden bg-neutral-200"
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

export default Carousal;
