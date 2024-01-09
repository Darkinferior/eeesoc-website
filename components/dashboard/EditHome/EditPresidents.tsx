// EditPresidents.tsx

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardHeader,
} from "@nextui-org/react";

interface President {
  _id: string;
  name: string;
  tenure: string;
}

interface PresidentData {
  name: string;
  tenure: string;
}

const EditPresidents: React.FC = () => {
  const [president, setPresident] = useState<any[]>([]);
  const [presidentData, setPresidentData] = useState<PresidentData>({
    name: "",
    tenure: "",
  });

  const [editpresidentId, setEditpresidentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPresident();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPresidentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchPresident = async () => {
    try {
      const response = await fetch("/api/presidents");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setPresident(data.result);
        } else {
          console.error("President data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch president");
      }
    } catch (error) {
      console.error("Error fetching president:", error);
    }
  };

  const handleAddpresident = async () => {
    const formData = new FormData();
    Object.entries(presidentData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await fetch("/api/admin/presidents/addPresident", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchPresident();

        setPresidentData({
          name: "",
          tenure: "",
        });
      } else {
        console.error("Failed to add president");
      }
    } catch (error) {
      console.error("Error adding president:", error);
    }
  };

  const handleEditpresident = async (id: string) => {
    const formData = new FormData();
    Object.entries(presidentData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const url = `/api/admin/presidents/updatePresident?id=${id}`;

      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchPresident();
        setPresidentData({
          name: "",
          tenure: "",
        });
        setIsModalOpen(false);
        setEditpresidentId(null);
      } else {
        console.error("Failed to edit president");
      }
    } catch (error) {
      console.error("Error editing president:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const presidentToEdit = president.find(
      (eachPresidentData) => eachPresidentData._id === id
    );
    if (!presidentToEdit) {
      console.error("president not found for editing");
      return;
    }
    setPresidentData({
      name: presidentToEdit.name,
      tenure: presidentToEdit.tenure,
    });
    setEditpresidentId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditpresidentId(null);
  };

  const handleDeletepresident = async (id: string) => {
    const formData = new FormData();
    Object.entries(presidentData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const url = `/api/admin/presidents/deletePresident?id=${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchPresident();
      } else {
        console.error("Failed to delete president");
      }
    } catch (error) {
      console.error("Error deleting president:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add President
        </CardHeader>

        <form onSubmit={handleAddpresident}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='name'
              label='Enter President Name'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='tenure'
              label='Enter President Tenure (start-end)'
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type='submit'>Add President</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing President
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {president.map((eachPresidentData: President) => (
            <li className='mx-4 mt-4 mb-4' key={eachPresidentData._id}>
              <div className='capitalize'>
                {eachPresidentData.name.toLowerCase()}
              </div>
              <div className='flex'>
                <Button
                  className='mx-2'
                  onClick={() => openModalForEdit(eachPresidentData._id)}
                >
                  Edit
                </Button>

                <Button
                  className='mx-2'
                  color='danger'
                  onClick={() => handleDeletepresident(eachPresidentData._id)}
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
        placement='top-center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Edit President
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='name'
              placeholder='Enter the President Name'
              value={presidentData.name}
              onChange={(e) =>
                setPresidentData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='tenure'
              placeholder='Enter the President Tenure (start-end)'
              value={presidentData.tenure}
              onChange={(e) =>
                setPresidentData((prevData) => ({
                  ...prevData,
                  tenure: e.target.value,
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
              onClick={() => handleEditpresident(editpresidentId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditPresidents;
