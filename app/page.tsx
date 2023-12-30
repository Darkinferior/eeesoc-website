'use client';
import { Link } from '@nextui-org/link';
import { button as buttonStyles } from '@nextui-org/theme';
import { Button } from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import AboutPage from './about/page';
import { Reveal } from '@/components/Reveal';
import ShuffleGrid from '@/components/ShuffleGrid';
import Image from 'next/image';
import TypeAnimationComponent from '@/components/TypeAnimation';
import { fontMono, fontSans } from '@/config/fonts';
import clsx from 'clsx';

export default function Home() {
  return (
    <div>
      <section className="w-full py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-10 mx-auto justify-start">
        <div>
          <div className="flex gap-4 mt-4 mb-4">
            <Image
              src="/bit-mesra-logo.png"
              alt="bit logo"
              width={100}
              height={100}
            />
            <Image
              src="/eeesoc-logo.png"
              alt="bit logo"
              width={100}
              height={100}
            />
          </div>
          <Reveal>
            <h2 className={clsx('text-3xl font-bold', fontMono.variable)}>
              Welcome to
            </h2>
          </Reveal>
          <Reveal>
            <h1
              className={clsx(
                'text-4xl md:text-6xl font-black justify-start mt-4 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-sans',
                fontSans.variable
              )}
            >
              Electrical and Electronics Engineering Society
            </h1>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl font-bold my-4 md:my-6">
              Birla Institute of Technology, Mesra
            </h2>
          </Reveal>
          <div className="flex gap-3">
            <Reveal>
              <Button
                variant="shadow"
                radius="full"
                className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
              >
                Recruitment
              </Button>
            </Reveal>
            <Reveal>
              <Link
                isExternal
                className={buttonStyles({
                  variant: 'bordered',
                  radius: 'full',
                })}
                href={siteConfig.navItems[1].href}
              >
                SMP Results
              </Link>
            </Reveal>
          </div>
        </div>
        <ShuffleGrid />
      </section>

      <section className="mt-32 mb-32 text-center" id="about">
        <TypeAnimationComponent text="Electrifying the Future, One Connection at a Time" />
      </section>

      <section className="my-32 text-center" id="about">
        <AboutPage />
      </section>
      <section className="flex flex-col items-center gap-4 mt-8 mb-16">
        <Reveal>
          <h1 className="text-2xl font-bold mb-8">In Collaboration with</h1>
        </Reveal>
        <Image
          src="/mathworks_logo.webp"
          alt="mathworks logo"
          className="object-contain"
          width={615}
          height={171}
        />
      </section>
    </div>
  );
}
