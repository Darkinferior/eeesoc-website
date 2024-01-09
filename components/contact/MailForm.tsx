<<<<<<< Updated upstream
<<<<<<< Updated upstream
'use client';
import { ChangeEvent, useState } from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';
import { Resend } from 'resend';
import { RiLoader2Fill } from 'react-icons/ri';
=======
=======
>>>>>>> Stashed changes
"use client";
import { ChangeEvent, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { RiLoader2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export default function MailForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleNameClear = () => {
    console.log("Name input cleared");
    setName("");
  };

  const handleContentClear = () => {
    console.log("Content input cleared");
    setContent("");
  };

  const handleEmailClear = () => {
    console.log("Email input cleared");
    setEmail("");
  };

  const handleSubjectClear = () => {
    console.log("Subject input cleared");
    setSubject("");
  };

  const [messageSent, setMessageSent] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    try {
      await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          subject: subject,
          emailAddress: email,
          content: content,
        }),
      });

      setMessageSent(true);
    } catch (error) {
      console.error("Error sending email:", error);

      setMessageSent(false);
      // TODO: handle mail failed to send

      // Handle error accordingly, e.g., show an error message to the user
    } finally {
      setIsPending(false);
      router.refresh();
    }
  };

  return (
    <form
      className='mt-16 flex flex-col max-w-full col-span-12 xl:col-span-7 w-full xl:w-3/5'
      onSubmit={onSubmit}
    >
      <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8'>
        <div className='col-span-1'>
          <Input
            isClearable
            isRequired
            type='text'
            label='Name'
            placeholder='Enter your Name'
            className='mb-4'
            value={name}
            onChange={handleNameChange}
            onClear={handleNameClear}
          />
        </div>

        <div className='col-span-1'>
          <Input
            isRequired
            isClearable
            type='email'
            label='Email'
            placeholder='Enter your email'
            className='mb-4'
            value={email}
            onChange={handleEmailChange}
            onClear={handleEmailClear}
          />
        </div>
      </div>

      <Input
        isClearable
        type='text'
        name='subject'
        placeholder='Subject'
        required
        className='mb-4'
        value={subject}
        onChange={handleSubjectChange}
        onClear={handleSubjectClear}
      />

      <Textarea
        label='Description'
        placeholder='Enter your description'
        className='mb-4'
        name='content'
        onChange={handleContentChange}
        onClear={handleContentClear}
      />

      <Button
        className='lg:w-4/12 sm:w-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg'
        radius='full'
        color='primary'
        type='submit'
        variant='shadow'
      >
        {isPending ? (
          <RiLoader2Fill className='animate-spin' />
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
