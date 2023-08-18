import { currentPresident } from "@/data/contact";
import {
  emailUrl,
  facebookUrl,
  linkedinUrl,
  mediumUrl,
} from "@/data/socialLinks";
import { BsMedium } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { RiFacebookFill } from "react-icons/ri";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center pt-20 pb-0 bg-footer">
      <h2>Connect with us</h2>
      <div className="mt-2 divider divider-small"></div>

      <div className="flex flex-col items-center w-4/5 mx-auto mt-16">
        <div className="grid w-full grid-cols-3">
          <div className="flex flex-col items-center col-span-3 xl:col-span-1">
            <h3 className="mb-4">Find us here</h3>
            <address className="font-normal">
              Department of Electrical and Electronics Engineering,
              <br />
              Birla Institute of Technology, Mesra
              <br />
              Ranchi, Jharkhand.
              <br />
              Pin Code - 835215.
            </address>
          </div>
          <div className="flex flex-col items-center col-span-3 mt-8 xl:mt-0 xl:col-span-1">
            <h3 className="mb-4">Mail us at</h3>
            <a href="mailto:eeesoc@bitmesra.ac.in">eeesoc@bitmesra.ac.in</a>
          </div>
          <div className="flex flex-col items-center col-span-3 mt-8 xl:mt-0 xl:col-span-1">
            <h3 className="mb-4">Call us at</h3>
            <p>{currentPresident.mobile}</p>
          </div>
        </div>

        <h3 className="mt-10">Social Links</h3>
        <div className="flex items-center gap-6 mt-4">
          <a href={facebookUrl} target="_blank" rel="noopener">
            <RiFacebookFill className="text-2xl" />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href={emailUrl} target="_blank" rel="noopener">
            <MdMail className="text-2xl" />
          </a>
          <a href={mediumUrl} target="_blank" rel="noopener">
            <BsMedium className="text-2xl" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center w-full py-5 mt-20 tracking-widest text-center border-t border-light-gray">
        Copyright &#169; {currentYear}
      </div>
    </footer>
  );
}
