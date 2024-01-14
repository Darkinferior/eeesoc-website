import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Workshop {
  _id: string;
  title: string;
  content: string;
  contentImage: File | null;
}

interface WorkshopData {
  title: string;
  content: string;
  contentImage: File | null;
}

const EditWorkshops: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [workshopData, setWorkshopData] = useState<WorkshopData>({
    title: "",
    content: "",
    contentImage: null,
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
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const handleAddWorkshop = async () => {
    const formData = new FormData();
    Object.entries(workshopData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch("/api/admin/workshops/addWorkshop", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchWorkshops();

        setWorkshopData({
          title: "",
          content: "",
          contentImage: null,
        });

        toast.success("Workshop added successfully");
      } else {
        toast.error("Failed to add workshop");
      }
    } catch (error) {
      toast.error("Error adding workshop");
    }
  };

  const handleEditWorkshop = async (id: string) => {
    const formData = new FormData();
    Object.entries(workshopData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        `/api/admin/workshops/updateWorkshop?id=${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        fetchWorkshops();

        setWorkshopData({
          title: "",
          content: "",
          contentImage: null,
        });

        setIsModalOpen(false);
        setEditWorkshopId(null);

        toast.success("Workshop updated successfully");
      } else {
        toast.error("Failed to edit workshop");
      }
    } catch (error) {
      toast.error("Error editing workshop");
    }
  };

  const fetchWorkshops = async () => {
    try {
      const response = await fetch("/api/workshops");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setWorkshops(data.result);
        } else {
          console.error("Workshops data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch workshops");
      }
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const workshopToEdit = workshops.find((workshop) => workshop._id === id);

    if (!workshopToEdit) {
      console.error("Workshop not found for editing");
      return;
    }

    setWorkshopData({
      title: workshopToEdit.title,
      content: workshopToEdit.content,
      contentImage: workshopToEdit.contentImage as File,
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
        `/api/admin/workshops/deleteWorkshop?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchWorkshops();
        toast.success("Workshop deleted successfully");
      } else {
        toast.error("Failed to delete workshop");
      }
    } catch (error) {
      toast.error("Error deleting workshop");
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add Workshop
        </CardHeader>

        <form onSubmit={handleAddWorkshop}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='title'
              label='Enter Workshop Title'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Textarea
              isRequired
              name='content'
              label='Enter Workshop Content'
              onChange={handleInputChange}
              required
            />
          </div>
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
                  onClick={() => openModalForEdit(workshop._id)}
                >
                  Edit
                </Button>

                <Button
                  className='mx-2'
                  color='danger'
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
        size='2xl'
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        placement='top-center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Edit Workshop
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Title'
              placeholder='Enter the workshop title'
              value={workshopData.title}
              onChange={(e) =>
                setWorkshopData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
            <Textarea
              label='Content'
              placeholder='Enter the workshop content'
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
              label='Image'
              type='file'
              placeholder='Enter the workshop image'
              accept='image/*'
              onChange={(e) =>
                setWorkshopData((prevData) => ({
                  ...prevData,
                  contentImage: e.target.files?.[0] as File,
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
              onClick={() => handleEditWorkshop(editWorkshopId!)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditWorkshops;
