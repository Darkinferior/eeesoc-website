import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ContactMeEmailProps = {
  name: string;
  emailAddress: string;
  content: string;
  subject: string;
};
