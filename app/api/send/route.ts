"use server";

import { EmailTemplate } from "@/components/contact/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendRouteSchema = z.object({
  name: z.string().min(2),
  subject: z.string().min(2),
  emailAddress: z.string().email(),
  content: z.string().min(2),
});

export async function POST(req: Request) {
  try {
    const { name, emailAddress, content, subject } = await req
      .json()
      .then((body) => sendRouteSchema.parse(body));

    const { data, error } = await resend.emails.send({
      from: "Contact Form<onboarding@resend.dev>",
      to: ["xboxonly7676@gmail.com"],
      reply_to: emailAddress,
      subject: "New Message from Website",
      react: EmailTemplate({
        name,
        emailAddress,
        content,
        subject,
      }),
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
