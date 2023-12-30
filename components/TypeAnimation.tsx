// TypeAnimationComponent.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation'; // Replace with the actual import

interface TypeAnimationComponentProps {
  text: string;
}

const TypeAnimationComponent: React.FC<TypeAnimationComponentProps> = ({
  text,
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  let timeoutId: NodeJS.Timeout | undefined;

  const handleSequenceEnd = () => {
    timeoutId = setTimeout(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 3000); // 2-second delay before restarting the animation
  };

  // Cleanup function to clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="font-black text-5xl">
      <TypeAnimation
        key={animationKey}
        sequence={[text, handleSequenceEnd]}
        wrapper="span"
        cursor={true}
        style={{
          background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: 'changeColors 5s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes changeColors {
            0%, 100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
          }
        `}
      </style>
    </div>
  );
};

export default TypeAnimationComponent;
