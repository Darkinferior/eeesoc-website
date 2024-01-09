<<<<<<< Updated upstream
=======
'use client';
>>>>>>> Stashed changes
import ContactDetails from '@/components/contact/ContactDetails';
import MailForm from '@/components/contact/MailForm';
import { title } from '@/components/primitives';

export default function ContactPage() {
  return (
    <div>
      <h1 className={title()}>Get in Touch</h1>

      <h1 className="mt-4 font-semibold text-2xl">
        Have a project on mind? Want to collaborate with us? <br />
        Don&apos;t hesistate to contact us. Let&apos;s have a talk together.
      </h1>
      <div className="flex flex-wrap justify-center">
        <MailForm />
        <ContactDetails />
      </div>
    </div>
  );
}
