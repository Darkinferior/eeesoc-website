'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  Button,
  Link,
  ScrollShadow,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react';

interface ProjectCardProps {
  name: string;
  title: string;
  image: string;
  description: string;
  reportLink?: string | null;
  githubLink?: string | null;
  demoLink?: string | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  title,
  image,
  description,
  reportLink,
  githubLink,
  demoLink,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card
      radius="lg"
      className="border-none sm:w-auto md:w-auto lg:w-auto transform hover:scale-105 transition-transform hover:shadow-[0_0px_60px_5px_rgba(0.3)] hover:shadow-cyan-500/50"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt={title}
          className="object-cover aspect-video"
          height={400}
          src={image}
          width={400}
        />
      </CardHeader>
      <CardBody className="">
        <Button
          className="w-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
          variant="shadow"
          radius="md"
          size="md"
          onPress={onOpen}
        >
          {name}
        </Button>
      </CardBody>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ScrollShadow>
                <ModalBody className="text-lg text-justify">
                  {description}
                </ModalBody>
              </ScrollShadow>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                {reportLink && (
                  <Button
                    isExternal
                    href={reportLink}
                    as={Link}
                    className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
                    showAnchorIcon
                    variant="shadow"
                  >
                    Project Report
                  </Button>
                )}
                {githubLink && (
                  <Button
                    isExternal
                    href={githubLink}
                    as={Link}
                    className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
                    showAnchorIcon
                    variant="shadow"
                  >
                    Github
                  </Button>
                )}
                {demoLink && (
                  <Button
                    isExternal
                    href={demoLink}
                    as={Link}
                    className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
                    showAnchorIcon
                    variant="shadow"
                  >
                    Demo
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ProjectCard;
