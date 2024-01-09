// EditWorkshops.tsx

<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
=======
import React, { useState, useEffect, ChangeEvent } from "react";
>>>>>>> Stashed changes
=======
import React, { useState, useEffect, ChangeEvent } from "react";
>>>>>>> Stashed changes
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  useDisclosure,
  Checkbox,
  Image,
  Input,
  Link,
  Textarea,
  Card,
  CardHeader,
} from '@nextui-org/react';
=======
=======
>>>>>>> Stashed changes
  Input,
  Textarea,
  Card,
  CardHeader,
} from "@nextui-org/react";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

interface Workshop {
  _id: string;
  title: string;
  content: string;
  cardImage: string;
}

interface WorkshopData {
  title: string;
  content: string;
  cardImage: File | null;
}

const EditWorkshops: React.FC = () => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [workshopData, setWorkshopData] = useState<WorkshopData>({
    title: '',
    content: '',
=======
=======
>>>>>>> Stashed changes
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [workshopData, setWorkshopData] = useState<WorkshopData>({
    title: "",
    content: "",
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    cardImage: null,
  });

  const [editWorkshopId, setEditWorkshopId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setWorkshopData((prevData) => ({
      ...prevData,
      [name]:
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        type === 'file' ? (e.target as HTMLInputElement).files?.[0] : value,
=======
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
>>>>>>> Stashed changes
=======
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
>>>>>>> Stashed changes
    }));
  };

  const handleAddWorkshop = async () => {
    const formData = new FormData();
    Object.entries(workshopData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        'http://localhost:3000/api/admin/workshops/addWorkshop',
        {
          method: 'POST',
=======
        "http://localhost:3000/api/admin/workshops/addWorkshop",
        {
          method: "POST",
>>>>>>> Stashed changes
=======
        "http://localhost:3000/api/admin/workshops/addWorkshop",
        {
          method: "POST",
>>>>>>> Stashed changes
          body: formData,
        }
      );

      if (response.ok) {
        fetchWorkshops();

        setWorkshopData({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          title: '',
          content: '',
          cardImage: null,
        });
      } else {
        console.error('Failed to add workshop');
      }
    } catch (error) {
      console.error('Error adding workshop:', error);
=======
=======
>>>>>>> Stashed changes
          title: "",
          content: "",
          cardImage: null,
        });
      } else {
        console.error("Failed to add workshop");
      }
    } catch (error) {
      console.error("Error adding workshop:", error);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
  };

  const handleEditWorkshop = async (id: string) => {
    const formData = new FormData();
    Object.entries(workshopData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/workshops/updateWorkshop?id=${id}`,
        {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          method: 'PATCH',
=======
          method: "PATCH",
>>>>>>> Stashed changes
=======
          method: "PATCH",
>>>>>>> Stashed changes
          body: formData,
        }
      );

      if (response.ok) {
        fetchWorkshops();

        setWorkshopData({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          title: '',
          content: '',
=======
          title: "",
          content: "",
>>>>>>> Stashed changes
=======
          title: "",
          content: "",
>>>>>>> Stashed changes
          cardImage: null,
        });

        setIsModalOpen(false);
        setEditWorkshopId(null);
      } else {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        console.error('Failed to edit workshop');
      }
    } catch (error) {
      console.error('Error editing workshop:', error);
=======
=======
>>>>>>> Stashed changes
        console.error("Failed to edit workshop");
      }
    } catch (error) {
      console.error("Error editing workshop:", error);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
  };

  const fetchWorkshops = async () => {
    try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      const response = await fetch('http://localhost:3000/api/workshops');
=======
      const response = await fetch("http://localhost:3000/api/workshops");
>>>>>>> Stashed changes
=======
      const response = await fetch("http://localhost:3000/api/workshops");
>>>>>>> Stashed changes
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setWorkshops(data.result);
        } else {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          console.error('Workshops data is not an array:', data);
        }
      } else {
        console.error('Failed to fetch workshops');
      }
    } catch (error) {
      console.error('Error fetching workshops:', error);
=======
=======
>>>>>>> Stashed changes
          console.error("Workshops data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch workshops");
      }
    } catch (error) {
      console.error("Error fetching workshops:", error);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
  };

  const openModalForEdit = (id: string) => {
    const workshopToEdit = workshops.find((workshop) => workshop._id === id);

    if (!workshopToEdit) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      console.error('Workshop not found for editing');
=======
      console.error("Workshop not found for editing");
>>>>>>> Stashed changes
=======
      console.error("Workshop not found for editing");
>>>>>>> Stashed changes
      return;
    }

    setWorkshopData({
      title: workshopToEdit.title,
      content: workshopToEdit.content,
      cardImage: null, // Assuming contentImage should not be edited in this example
    });

    setEditWorkshopId(id);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditWorkshopId(null);
  };

  const handleDeleteWorkshop = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/workshops/deleteWorkshop?id=${id}`,
        {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          method: 'DELETE',
=======
          method: "DELETE",
>>>>>>> Stashed changes
=======
          method: "DELETE",
>>>>>>> Stashed changes
        }
      );

      if (response.ok) {
        fetchWorkshops();
      } else {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        console.error('Failed to delete workshop');
      }
    } catch (error) {
      console.error('Error deleting workshop:', error);
=======
=======
>>>>>>> Stashed changes
        console.error("Failed to delete workshop");
      }
    } catch (error) {
      console.error("Error deleting workshop:", error);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
  };

  return (
    <div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <Card isBlurred className="mt-4 mb-4">
        <CardHeader className="items-center text-center justify-center text-xl font-bold">
=======
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
>>>>>>> Stashed changes
=======
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
>>>>>>> Stashed changes
          Add Workshop
        </CardHeader>

        <form onSubmit={handleAddWorkshop}>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="title"
              label="Enter Workshop Title"
=======
=======
>>>>>>> Stashed changes
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='title'
              label='Enter Workshop Title'
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              onChange={handleInputChange}
              required
            />
          </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          <div className="mt-4 mb-4">
            <Textarea
              isRequired
              name="content"
              label="Enter Workshop Content"
=======
=======
>>>>>>> Stashed changes
          <div className='mt-4 mb-4'>
            <Textarea
              isRequired
              name='content'
              label='Enter Workshop Content'
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              onChange={handleInputChange}
              required
            />
          </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          <div className="mt-4 mb-4">
            <div className="mb-2">Upload Workshop Image (Required)</div>
            <Input
              isRequired
              type="file"
              name="contentImage"
              onChange={handleInputChange}
              accept="image/*"
            />
          </div>
          <Button type="submit">Add Workshop</Button>
        </form>
      </Card>
      <Card isBlurred className="mt-4 mb-4">
        <CardHeader className="items-center text-center justify-center text-xl font-bold">
          Edit Existing Workshops
        </CardHeader>
        <ul className="flex flex-wrap items-center justify-center text-center mt-4 mb-4">
          {workshops.map((workshop) => (
            <li className="mx-4 mt-4 mb-4" key={workshop._id}>
              <div>{workshop.title}</div>
              <div className="flex">
                <Button
                  className="mx-2"
=======
=======
>>>>>>> Stashed changes
          <div className='mt-4 mb-4'>
            <div className='mb-2'>Upload Workshop Image (Required)</div>
            <Input
              isRequired
              type='file'
              name='contentImage'
              onChange={handleInputChange}
              accept='image/*'
            />
          </div>
          <Button type='submit'>Add Workshop</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing Workshops
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {workshops.map((workshop) => (
            <li className='mx-4 mt-4 mb-4' key={workshop._id}>
              <div>{workshop.title}</div>
              <div className='flex'>
                <Button
                  className='mx-2'
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                  onClick={() => openModalForEdit(workshop._id)}
                >
                  Edit
                </Button>

                <Button
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                  className="mx-2"
                  color="danger"
=======
                  className='mx-2'
                  color='danger'
>>>>>>> Stashed changes
=======
                  className='mx-2'
                  color='danger'
>>>>>>> Stashed changes
                  onClick={() => handleDeleteWorkshop(workshop._id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
=======
=======
>>>>>>> Stashed changes
        placement='top-center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            Edit Workshop
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              label="Title"
              placeholder="Enter the workshop title"
=======
              label='Title'
              placeholder='Enter the workshop title'
>>>>>>> Stashed changes
=======
              label='Title'
              placeholder='Enter the workshop title'
>>>>>>> Stashed changes
              value={workshopData.title}
              onChange={(e) =>
                setWorkshopData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
            <Textarea
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              label="Content"
              placeholder="Enter the workshop content"
=======
              label='Content'
              placeholder='Enter the workshop content'
>>>>>>> Stashed changes
=======
              label='Content'
              placeholder='Enter the workshop content'
>>>>>>> Stashed changes
              value={workshopData.content}
              onChange={(e) =>
                setWorkshopData((prevData) => ({
                  ...prevData,
                  content: e.target.value,
                }))
              }
            />
            <Input
              isRequired
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              label="Image"
              type="file"
              placeholder="Enter the workshop image"
=======
              label='Image'
              type='file'
              placeholder='Enter the workshop image'
>>>>>>> Stashed changes
=======
              label='Image'
              type='file'
              placeholder='Enter the workshop image'
>>>>>>> Stashed changes
              onChange={(e) =>
                setWorkshopData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
          </ModalBody>
          <ModalFooter>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            <Button color="danger" variant="flat" onClick={closeModal}>
              Close
            </Button>
            <Button
              color="primary"
=======
=======
>>>>>>> Stashed changes
            <Button color='danger' variant='flat' onClick={closeModal}>
              Close
            </Button>
            <Button
              color='primary'
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              onClick={() => handleEditWorkshop(editWorkshopId!)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      </Modal>{' '}
=======
      </Modal>{" "}
>>>>>>> Stashed changes
=======
      </Modal>{" "}
>>>>>>> Stashed changes
    </div>
  );
};

export default EditWorkshops;
