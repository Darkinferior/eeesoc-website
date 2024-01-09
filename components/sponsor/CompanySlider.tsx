'use client';
import './CompanySlider.css';
import { Image } from '@nextui-org/image';

function CompanySlider() {
  const row1: string[] = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1024px-Microsoft_logo_%282012%29.svg.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png',
  ];

  const row2: string[] = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/9dd55e54b5a28658bf4e.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/35e044b3354aaa0caed5.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png',
    'https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png',
  ];

  return (
    <div className="app-container">
      <div className="wrapper">
        <div className="marquee">
          <div className="marquee-group mt-4 mb-4">
            {row1.map((el, index) => (
              <div
                className="image-group mx-4 aspect-video bg-white"
                key={index}
              >
                <Image
                  radius="none"
                  isBlurred
                  height={400}
                  src={el}
                  alt="company-image"
                />
              </div>
            ))}
          </div>
          <div className="marquee-group mt-4 mb-4">
            {row1.map((el, index) => (
              <div
                className="image-group mx-4 aspect-video bg-white"
                key={index}
              >
                <Image
                  radius="none"
                  isBlurred
                  height={400}
                  src={el}
                  alt="company-image"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-group2 mt-4 mb-4">
            {row2.map((el, index) => (
              <div
                className="image-group mx-4 aspect-video bg-white"
                key={index}
              >
                <Image
                  radius="none"
                  isBlurred
                  height={400}
                  src={el}
                  alt="company-image"
                />
              </div>
            ))}
          </div>
          <div className="marquee-group2 mt-4 mb-4">
            {row2.map((el, index) => (
              <div
                className="image-group mx-4 aspect-video bg-white"
                key={index}
              >
                <Image
                  radius="none"
                  isBlurred
                  height={400}
                  src={el}
                  alt="company-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanySlider;
