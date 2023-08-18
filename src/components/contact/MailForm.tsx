"use client";

import { sendMail } from "@/utils/sendMail";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";

export default function MailForm() {
  const [contactForm, setContactForm] = useState({
    name: "Ankit",
    email: "myselfankit51@gmail.com",
    subject: "Test",
    message: "Hello world",
  });

  const [messageSent, setMessageSent] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   setIsPending(true);

    //   await sendMail(contactForm);

    //   setIsPending(false);
    //   setMessageSent(true);
    // } catch (e) {
    //   console.log("CLIENT", e);
    // }

    // setContactForm({
    //   name: "",
    //   email: "",
    //   subject: "",
    //   message: "",
    // });
  };

  return (
    <form
      className="flex flex-col max-w-full col-span-12 xl:col-span-7"
      onSubmit={handleSubmit}
    >
      {messageSent && (
        <div
          role="alert"
          className="flex items-center p-4 mb-4 text-green-900 bg-green-200 rounded"
        >
          <span className="flex-1">Your message was sent successfully.</span>
          <button onClick={() => setMessageSent(false)}>
            <MdClose />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 xl:gap-8 xl:w-full">
        <input
          name="name"
          className="col-span-2 p-2 border rounded xl:col-span-1 border-gray focus:ring focus:ring-light-purple"
          value={contactForm.name}
          placeholder="Name"
          onChange={(e) =>
            setContactForm((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          required
        />
        <input
          name="email"
          type="email"
          value={contactForm.email}
          className="col-span-2 p-2 border rounded xl:col-span-1 border-gray focus:ring focus:ring-light-purple"
          placeholder="Email"
          onChange={(e) =>
            setContactForm((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          required
        />
      </div>
      <input
        name="subject"
        value={contactForm.subject}
        className="col-span-1 p-2 mt-4 border rounded border-gray focus:ring focus:ring-light-purple"
        placeholder="Subject"
        required
        onChange={(e) =>
          setContactForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
      <textarea
        name="message"
        className="col-span-1 p-2 mt-4 border rounded border-gray focus:ring focus:ring-light-purple"
        value={contactForm.message}
        rows={6}
        placeholder="Message"
        onChange={(e) =>
          setContactForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        required
      />
      <button
        type="submit"
        className="px-4 py-2 mt-8 text-sm text-white transition-all rounded xl:self-start bg-neutral-600 hover:bg-neutral-700"
      >
        {isPending ? (
          <RiLoader2Fill className="animate-spin" />
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
