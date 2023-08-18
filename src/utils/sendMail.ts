"use server";

import EmailTemplate from "@/components/EmailTemplate";
import { eeeEmail } from "@/data/socialLinks";
import { Resend } from "resend";

export const sendMail = async (contactForm: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: contactForm.email,
      to: eeeEmail,
      subject: contactForm.subject,
      react: EmailTemplate({
        name: contactForm.name,
        message: contactForm.message,
      }),
    });
  } catch (e) {
    console.log("SERVER", (e as any).message);
  }
};
