import { Image } from '@nextui-org/react';
import styles from './Alumni.module.css';

interface Alumni {
  _id: string;
  name: string;
  workplace?: string;
  position?: string;
  image: string;
  linkedinUrl?: string;
}

interface AlumniCardProps {
  senior: Alumni;
  year: number;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ senior, year }) => {
  return (
    <div className="w-full py-4 sm:w-1/2 xl:w-1/3">
      <a
        href={senior.linkedinUrl ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.content}>
          <Image
            src={senior.image}
            alt={senior.name}
            height={375}
            width={375}
            className="w-full rounded z-0"
          />
          <div
            className={`${styles.contentDetails} sm-hidden rounded xl:flex flex-col justify-center z-10 ${styles.fadeInBottom}`}
          >
            <h3>{senior.name}</h3>
            <p>{senior.workplace ?? `${year + 4} PASS OUT`}</p>
            <p>{senior?.position}</p>
          </div>
        </div>
      </a>
      <div className={`text-center lg:hidden mt-3 ${styles.visibleDetails}`}>
        <h4>{senior.name}</h4>
        <h6 className="font-normal">
          {senior.workplace ?? `${year - 4} PASS OUT`}
        </h6>
        <h6 className="font-normal text-neutral-500">{senior?.position}</h6>
      </div>
    </div>
  );
};

export default AlumniCard;
