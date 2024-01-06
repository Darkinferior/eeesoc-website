// EditAlumni.tsx

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Image,
  Input,
  Link,
  Textarea,
  Card,
  CardHeader,
} from "@nextui-org/react";

interface Alumni {
  _id: string;
  name: string;
  workplace: string;
  position: string;
  linkedinUrl: string;
  year: string;
  image: string;
}

interface AlumniData {
  name: string;
  workplace: string;
  position: string;
  linkedinUrl: string;
  year: string;
  image: File | null;
}

const EditAlumni: React.FC = () => {
  const router = useRouter();
  const [alumnis, setAlumnis] = useState<any[]>([]);
  const [alumniData, setAlumniData] = useState<AlumniData>({
    name: "",
    workplace: "",
    position: "",
    linkedinUrl: "",
    year: "",
    image: null,
  });

  const [editAlumniId, setEditAlumniId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAlumnis();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setAlumniData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const fetchAlumnis = async () => {
    try {
      const response = await fetch("/api/alumni");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setAlumnis(data.result);
        } else {
          console.error("Alumnis data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch alumnis");
      }
    } catch (error) {
      console.error("Error fetching alumnis:", error);
    }
  };

  const handleAddAlumni = async () => {
    const formData = new FormData();
    Object.entries(alumniData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch("/api/admin/alumni/addAlumni", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchAlumnis();

        setAlumniData({
          name: "",
          workplace: "",
          position: "",
          linkedinUrl: "",
          year: "",
          image: null,
        });
      } else {
        console.error("Failed to add alumni");
      }
    } catch (error) {
      console.error("Error adding alumni:", error);
    }
  };

  const handleEditAlumni = async (id: string) => {
    const alumniToEdit = alumnis
      .map((batchWiseAlumni) => [
        batchWiseAlumni.alumni.filter((alumni: Alumni) => alumni._id === id),
        batchWiseAlumni.year,
      ])
      .filter((alumni) => alumni[0].length > 0)[0];

    const formData = new FormData();
    Object.entries(alumniData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `/api/admin/alumni/updateAlumni?year=${alumniToEdit[1]}&name=${alumniToEdit[0][0].name}&workplace=${alumniToEdit[0][0].workplace}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchAlumnis();

        setAlumniData({
          name: "",
          workplace: "",
          position: "",
          linkedinUrl: "",
          year: "",
          image: null,
        });

        setIsModalOpen(false);
        setEditAlumniId(null);
      } else {
        console.error("Failed to edit alumni");
      }
    } catch (error) {
      console.error("Error editing alumni:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const alumniToEdit = alumnis
      .map((batchWiseAlumni) =>
        batchWiseAlumni.alumni.filter((alumni: Alumni) => alumni._id === id)
      )
      .filter((alumni) => alumni.length > 0)[0][0];

    if (!alumniToEdit) {
      console.error("Alumni not found for editing");
      return;
    }

    setAlumniData({
      name: alumniToEdit.name,
      workplace: alumniToEdit.workplace,
      position: alumniToEdit.position,
      linkedinUrl: alumniToEdit.linkedinUrl,
      year: alumniToEdit.year,
      image: alumniToEdit.image,
    });

    setEditAlumniId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditAlumniId(null);
  };

  const handleDeleteAlumni = async (id: string) => {
    const alumniToEdit = alumnis
      .map((batchWiseAlumni) => [
        batchWiseAlumni.alumni.filter((alumni: Alumni) => alumni._id === id),
        batchWiseAlumni.year,
      ])
      .filter((alumni) => alumni[0].length > 0)[0];
    try {
      const url = `/api/admin/alumni/deleteAlumni?year=${alumniToEdit[1]}&name=${alumniToEdit[0][0].name}&workplace=${alumniToEdit[0][0].workplace}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAlumnis();
      } else {
        console.error("Failed to delete alumni");
      }
    } catch (error) {
      console.error("Error deleting alumni:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add Alumni
        </CardHeader>

        <form onSubmit={handleAddAlumni}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='name'
              label='Enter Alumni Name'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='position'
              label='Enter Alumni Position'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='workplace'
              label='Enter Alumni Workplace'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='linkedinUrl'
              label='Enter Alumni LinkedIn Url'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='year'
              label='Enter Alumni Year'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <div className='mb-2'>Upload Alumni Image (Required)</div>
            <Input
              isRequired
              type='file'
              name='image'
              onChange={handleInputChange}
              accept='image/*'
            />
          </div>
          <Button type='submit'>Add Alumni</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing Alumnis
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {alumnis.map((batchWiseAlumni) => {
            return batchWiseAlumni.alumni.map((alumni: Alumni) => (
              <li className='mx-4 mt-4 mb-4' key={alumni._id}>
                <div className='capitalize'>{alumni.name.toLowerCase()}</div>
                <div className='text-semibold'>
                  K'{batchWiseAlumni.year % 100}
                </div>
                <div className='flex'>
                  <Button
                    className='mx-2'
                    onClick={() => openModalForEdit(alumni._id)}
                  >
                    Edit
                  </Button>

                  <Button
                    className='mx-2'
                    color='danger'
                    onClick={() => handleDeleteAlumni(alumni._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ));
          })}
        </ul>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        placement='top-center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Edit Alumni</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Name'
              placeholder='Enter the Alumni Name'
              value={alumniData.name}
              onChange={(e) =>
                setAlumniData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />

            <Input
              autoFocus
              label='Position'
              placeholder='Enter the Alumni Position'
              value={alumniData.position}
              onChange={(e) =>
                setAlumniData((prevData) => ({
                  ...prevData,
                  position: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Workplace'
              placeholder='Enter the Alumni Workplace'
              value={alumniData.workplace}
              onChange={(e) =>
                setAlumniData((prevData) => ({
                  ...prevData,
                  workplace: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='LinkedIn Link'
              placeholder='Enter the Alumni LinkedIn Link'
              value={alumniData.linkedinUrl}
              onChange={(e) =>
                setAlumniData((prevData) => ({
                  ...prevData,
                  linkedinUrl: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Year'
              placeholder='Enter the Alumni Year'
              value={alumniData.year}
              onChange={(e) =>
                setAlumniData((prevData) => ({
                  ...prevData,
                  year: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label='Image'
              type='file'
              placeholder='Enter the Alumni image'
              onChange={(e) =>
                setAlumniData((prevData) => ({
                  ...prevData,
                  [e.target.name]:
                    e.target.type === "file"
                      ? (e.target as HTMLInputElement).files?.[0]
                      : e.target.value,
                }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='flat' onClick={closeModal}>
              Close
            </Button>
            <Button
              color='primary'
              onClick={() => handleEditAlumni(editAlumniId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditAlumni;
