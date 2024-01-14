'use client';
import './CompanySlider.css';
import { Image } from '@nextui-org/image';

function CompanySlider() {
  const row1: string[] = [
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808962/placements/siemens.svg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808962/placements/nvidia.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808961/placements/tata_steel.svg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808961/placements/british_telecom.jpg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808961/placements/futurefirst.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808961/placements/truminds.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808961/placements/pwc.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808960/placements/amadeus.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808960/placements/tata_motors.jpg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808960/placements/GlobalLogic-Logo.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808959/placements/increff.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808960/placements/fastenal.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808959/placements/kpmg.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808960/placements/tata_autocomp.jpg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808959/placements/Visa-Logo.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808959/placements/microsoft.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808959/placements/nxp.png',
  ];

  const row2: string[] = [
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808958/placements/synopsis.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808958/placements/amazon.webp',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808958/placements/deloitte.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808958/placements/addverb.jpg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808958/placements/hcl.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808957/placements/bajaj.webp',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808951/placements/accenture.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808931/placements/zs.svg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808922/placements/ibm.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808923/placements/infinion.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808921/placements/box8.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808921/placements/samsung.svg',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808921/placements/cypress.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808921/placements/jsw.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808921/placements/tata_power.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808921/placements/oracle.png',
    'https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704808921/placements/maruti_suzuki.png',
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
                  src={el}
                  alt="company-image"
                  className="aspect-video"
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
                  src={el}
                  alt="company-image"
                  className="aspect-video"
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
                  src={el}
                  alt="company-image"
                  className="aspect-video"
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
                  src={el}
                  alt="company-image"
                  className="aspect-video"
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
