'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Square {
  id: number;
  src: string;
}

const shuffle = (array: any) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
const squareData = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788764/Shuffle%20Grid%20Images/bulbs.jpg',
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788756/Shuffle%20Grid%20Images/pulsar.jpg',
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788754/Shuffle%20Grid%20Images/motor.jpg',
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788752/Shuffle%20Grid%20Images/meter.jpg',
  },
  {
    id: 5,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788735/Shuffle%20Grid%20Images/earth.jpg',
  },
  {
    id: 6,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788734/Shuffle%20Grid%20Images/arduino.jpg',
  },
  {
    id: 7,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788746/Shuffle%20Grid%20Images/electronics.jpg',
  },
  {
    id: 8,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788743/Shuffle%20Grid%20Images/intel.jpg',
  },
  {
    id: 9,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788760/Shuffle%20Grid%20Images/solar.jpg',
  },
  {
    id: 10,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788762/Shuffle%20Grid%20Images/windmill.jpg',
  },
  {
    id: 11,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788772/Shuffle%20Grid%20Images/walle.jpg',
  },
  {
    id: 12,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788805/Shuffle%20Grid%20Images/circuit.jpg',
  },
  {
    id: 13,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788757/Shuffle%20Grid%20Images/ryzen.jpg',
  },
  {
    id: 14,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788757/Shuffle%20Grid%20Images/pole.jpg',
  },
  {
    id: 15,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788819/Shuffle%20Grid%20Images/mcb.jpg',
  },
  {
    id: 16,
    src: 'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704788796/Shuffle%20Grid%20Images/hologram.jpg',
  },
];

// const generateSquares = () => {
//   return shuffle(squareData).map((sq: Square) => (
//     <motion.div
//       key={sq.id}
//       layout
//       transition={{ duration: 1.5, type: 'spring' }}
//       className="w-full h-full"
//       style={{
//         backgroundImage: `url(${sq.src})`,
//         backgroundSize: 'cover',
//       }}
//     ></motion.div>
//   ));
// };

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const generateSquares = () => {
      return shuffle(squareData).map((sq: Square) => (
        <motion.div
          key={sq.id}
          layout
          transition={{ duration: 1.5, type: 'spring' }}
          className="w-full h-full"
          style={{
            backgroundImage: `url(${sq.src})`,
            backgroundSize: 'cover',
          }}
        ></motion.div>
      ));
    };

    const shuffleSquares = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    shuffleSquares(); // Start the animation loop initially

    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares}
    </div>
  );
};

export default ShuffleGrid;
