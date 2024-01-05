import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypeAnimationComponentProps {
  text: string;
}

const TypeAnimationComponent: React.FC<TypeAnimationComponentProps> = ({
  text,
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  let timeoutId: NodeJS.Timeout | undefined;
  const [responsiveStyles, setResponsiveStyles] = useState({
    height: '4em',
    overflow: 'hidden',
  });

  const handleSequenceEnd = () => {
    timeoutId = setTimeout(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 3000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setResponsiveStyles({ height: '5em', overflow: 'hidden' });
      } else if (window.innerWidth >= 768) {
        setResponsiveStyles({ height: '3em', overflow: 'hidden' });
      } else if (window.innerWidth < 640) {
        setResponsiveStyles({ height: '7em', overflow: 'hidden' });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [timeoutId]);

  return (
    <div
      className="font-black text-5xl"
      style={{
        ...responsiveStyles,
      }}
    >
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
