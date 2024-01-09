<<<<<<< Updated upstream
import Image from 'next/image';
import { IconEmail } from './icons';
import { Link, Divider } from '@nextui-org/react';
=======
import { IconEmail } from './icons';
import { Link, Divider, Image } from '@nextui-org/react';
>>>>>>> Stashed changes
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full text-center items-center justify-center">
      <h2 className="text-3xl font-semibold">Connect with us</h2>

      <div className="flex flex-col items-center w-full mx-auto mt-8 mb-8">
        <div className="grid w-full grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          <div className="flex flex-col items-center col-span-1">
            <h3 className="mb-4 text-xl font-bold">Find us here</h3>

            <address className="flex gap-1">
              <Link
                color="foreground"
                href={siteConfig.links.location}
                isExternal
              >
                Department of Electrical and Electronics Engineering,
                <br />
                Birla Institute of Technology, Mesra
                <br />
                Ranchi, Jharkhand.
                <br />
                Pin Code - 835215.
              </Link>
            </address>
          </div>
          <div className="flex items-center justify-center gap-6 mb-4 col-span-1 mx-8 sm:mx-4 lg:mx-auto">
            <Image
              src="https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704819982/logos/bit-mesra-logo.png"
              alt="bit logo"
              width={75}
              height={75}
            />
            <div>
              <h1 className="text-2xl font-bold italic">
                Electrifying the Future,
                <br /> One Connection at a Time
              </h1>
            </div>
            <Image
              src="https://res.cloudinary.com/dnni24ave/image/upload/w_1000/q_auto/f_auto/v1704819764/logos/eeesoc-logo.png"
              alt="eeesoc logo"
              width={75}
              height={75}
            />
          </div>
          <div className="flex flex-col items-center col-span-1">
            <h3 className="mb-4 text-xl font-bold">Mail us at</h3>
            <Link
              className=" gap-2"
              href={siteConfig.links.email}
              color="foreground"
            >
              <IconEmail />
              eeesoc@bitmesra.ac.in
            </Link>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-center w-full py-5 tracking-widest text-center px-8">
        Created with 💖 by Shivesh, Aditi, and Ved | Copyright &#169;{' '}
        {currentYear}
      </div>
    </div>
  );
}
