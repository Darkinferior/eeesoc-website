import { Link } from '@nextui-org/link';
import { IconEmail } from '../icons';
import { Reveal } from '../Reveal';
const ContactDetails = () => {
  return (
    <div className="px-16 justify-start items-start ">
      <h1 className="mt-16 font-bold text-2xl text-center">Contact Info</h1>

      <Link className="mt-8 text-xl gap-2" href="#" color="foreground">
        <Reveal>
          <IconEmail />
        </Reveal>
        <Reveal>eeesoc@bitmesra.ac.in</Reveal>
      </Link>
    </div>
  );
};

export default ContactDetails;
