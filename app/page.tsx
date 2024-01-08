"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import AboutPage from "./about/page";
import { Reveal } from "@/components/Reveal";
import ShuffleGrid from "@/components/ShuffleGrid";
import Image from "next/image";
import TypeAnimationComponent from "@/components/TypeAnimation";
import { useEffect, useState } from "react";

interface Result {
  title: string;
  link: string;
}

interface Register {
  title: string;
  formLink: string;
}

export default function Home() {
  const [result, setResultData] = useState<Result>({
    title: "",
    link: "",
  });
  const [register, setRegisterData] = useState<Register>({
    title: "",
    formLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const responseResult = await fetch(
          "/api/events/result",
          requestOptions
        );
        const responseRegister = await fetch(
          "/api/events/register",
          requestOptions
        );

        if (responseResult.ok) {
          const resultJson = await responseResult.json();
          setResultData(resultJson.result);
        } else {
          console.error(
            "Error fetching data:",
            responseResult.status,
            responseResult.statusText
          );
        }
        if (responseRegister.ok) {
          const registerJson = await responseRegister.json();
          setRegisterData(registerJson.result);
        } else {
          console.error(
            "Error fetching data:",
            responseRegister.status,
            responseRegister.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className='font-josephin w-full py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-10 mx-auto justify-start'>
        <div>
          <div className='flex gap-4 mt-4 mb-4'>
            <Image
              src='/bit-mesra-logo.png'
              alt='bit logo'
              width={100}
              height={100}
            />
            <Image
              src='/eeesoc-logo.png'
              alt='bit logo'
              width={100}
              height={100}
            />
          </div>
          <Reveal>
            <h2 className='text-3xl font-bold '>Welcome to</h2>
          </Reveal>
          <Reveal>
            <h1 className='font-montserrat text-4xl md:text-6xl font-black justify-start mt-4 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500'>
              Electrical and Electronics Engineering Society
            </h1>
          </Reveal>
          <Reveal>
            <h2 className='text-3xl font-bold my-4 md:my-6'>
              Birla Institute of Technology, Mesra
            </h2>
          </Reveal>
          <div className='flex gap-3'>
            <Reveal>
              <Link
                className={`${buttonStyles({
                  variant: "shadow",
                  radius: "full",
                })} bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg`}
                href={register.formLink}
              >
                {register.title.toLowerCase() !== "title"
                  ? register.title
                  : "Recruitment"}
              </Link>
            </Reveal>
            <Reveal>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={
                  result.link !== "/"
                    ? result.link
                    : siteConfig.navItems[1].href
                }
              >
                {result.title.toLowerCase() !== "title"
                  ? result.title
                  : "SMP Results"}
              </Link>
            </Reveal>
          </div>
        </div>
        <ShuffleGrid />
      </section>

      <section className='mt-32 mb-32 text-center' id='about'>
        <TypeAnimationComponent text='Electrifying the Future, One Connection at a Time' />
      </section>

      <section className='my-32 text-center' id='about'>
        <AboutPage />
      </section>
      <section className='flex flex-col items-center gap-4 mt-8 mb-16'>
        <Reveal>
          <h1 className='text-2xl font-bold mb-8'>In Collaboration with</h1>
        </Reveal>
        <Image
          src='/mathworks_logo.webp'
          alt='mathworks logo'
          className='object-contain'
          width={615}
          height={171}
        />
      </section>
    </div>
  );
}
