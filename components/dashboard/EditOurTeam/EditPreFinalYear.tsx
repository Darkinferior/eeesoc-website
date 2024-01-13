// EditPreFinalYear.tsx

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

interface PreFinalYear {
  _id: string;
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  image: string;
}

interface PreFinalYearData {
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  image: File | null;
}

const EditPreFinalYear: React.FC = () => {
  const [PreFinalYears, setPreFinalYears] = useState<any[]>([]);
  const [PreFinalYearData, setPreFinalYearData] = useState<PreFinalYearData>({
    name: "",
    EmailID: "",
    designation: "",
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    image: null,
  });

  const [editPreFinalYearId, setEditPreFinalYearId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPreFinalYears();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setPreFinalYearData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const fetchPreFinalYears = async () => {
    try {
      const response = await fetch("/api/executiveBody");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.k21)) {
          setPreFinalYears(data.k21);
        } else {
          console.error("Pre Final Years' data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch Pre Final Years' data");
      }
    } catch (error) {
      console.error("Error fetching Pre Final Years' data:", error);
    }
  };

  const handleAddPreFinalYear = async () => {
    const formData = new FormData();
    Object.entries(PreFinalYearData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        "/api/admin/executiveBody/preFinalYear/addMember",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        fetchPreFinalYears();

        setPreFinalYearData({
          name: "",
          EmailID: "",
          designation: "",
          linkedinUrl: "",
          facebookUrl: "",
          instagramUrl: "",
          image: null,
        });
      } else {
        console.error("Failed to add Pre Final Year");
      }
    } catch (error) {
      console.error("Error adding Pre Final Year:", error);
    }
  };

  const handleEditPreFinalYear = async (id: string) => {
    const formData = new FormData();
    Object.entries(PreFinalYearData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `/api/admin/executiveBody/preFinalYear/updateMember?id=${id}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchPreFinalYears();

        setPreFinalYearData({
          name: "",
          EmailID: "",
          designation: "",
          linkedinUrl: "",
          facebookUrl: "",
          instagramUrl: "",
          image: null,
        });

        setIsModalOpen(false);
        setEditPreFinalYearId(null);
      } else {
        console.error("Failed to edit PreFinalYear");
      }
    } catch (error) {
      console.error("Error editing PreFinalYear:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const PreFinalYearToEdit = PreFinalYears.find(
      (PreFinalYear) => PreFinalYear._id === id
    );

    if (!PreFinalYearToEdit) {
      console.error("PreFinalYear not found for editing");
      return;
    }

    setPreFinalYearData({
      name: PreFinalYearToEdit.name,
      EmailID: PreFinalYearToEdit.EmailID,
      designation: PreFinalYearToEdit.designation,
      linkedinUrl: PreFinalYearToEdit.linkedinUrl,
      facebookUrl: PreFinalYearToEdit.facebookUrl,
      instagramUrl: PreFinalYearToEdit.instagramUrl,
      image: PreFinalYearToEdit.image,
    });

    setEditPreFinalYearId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditPreFinalYearId(null);
  };

  const handleDeletePreFinalYear = async (id: string) => {
    try {
      const url = `/api/admin/executiveBody/preFinalYear/deleteMember?id=${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPreFinalYears();
      } else {
        console.error("Failed to delete PreFinalYear");
      }
    } catch (error) {
      console.error("Error deleting PreFinalYear:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add Pre Final Year Executive Body
        </CardHeader>
        <form onSubmit={handleAddPreFinalYear}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='name'
              label='Enter Name'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='EmailID'
              label='Enter Email ID'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='designation'
              label='Enter Designation'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='linkedinUrl'
              label='Enter LinkedIn Url'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='facebookUrl'
              label='Enter Facebook Url'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='instagramUrl'
              label='Enter Instagram Url'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <div className='mb-2'>Upload Image (Required)</div>
            <Input
              isRequired
              type='file'
              name='image'
              onChange={handleInputChange}
              accept='image/*'
            />
          </div>
          <Button type='submit'>Add</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing Pre Final Year Executive Body
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {PreFinalYears.map((PreFinalYear: PreFinalYear) => (
            <li className='mx-4 mt-4 mb-4' key={PreFinalYear._id}>
              <div className='capitalize'>
                {PreFinalYear.name.toLowerCase()}
              </div>
              <div className='flex'>
                <Button
                  className='mx-2'
                  onClick={() => openModalForEdit(PreFinalYear._id)}
                >
                  Edit
                </Button>

                <Button
                  className='mx-2'
                  color='danger'
                  onClick={() => handleDeletePreFinalYear(PreFinalYear._id)}
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
          <ModalHeader className='flex flex-col gap-1'>Edit</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Name'
              placeholder='Enter the Name'
              value={PreFinalYearData.name}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />

            <Input
              autoFocus
              label='EmailID'
              placeholder='Enter the Email ID'
              value={PreFinalYearData.EmailID}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
                  ...prevData,
                  EmailID: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Designation'
              placeholder='Enter the Designation'
              value={PreFinalYearData.designation}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
                  ...prevData,
                  designation: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='LinkedIn Link'
              placeholder='Enter the LinkedIn Link'
              value={PreFinalYearData.linkedinUrl}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
                  ...prevData,
                  linkedinUrl: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Facebook Link'
              placeholder='Enter the Facebook Link'
              value={PreFinalYearData.facebookUrl}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
                  ...prevData,
                  facebookUrl: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='instagramUrl'
              placeholder='Enter the Instagram Url'
              value={PreFinalYearData.instagramUrl}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
                  ...prevData,
                  instagramUrl: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label='Image'
              type='file'
              placeholder='Enter the PreFinalYear image'
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
                  ...prevData,
                  image: (e.target as HTMLInputElement).files?.[0] as File,
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
              onClick={() =>
                handleEditPreFinalYear(editPreFinalYearId as string)
              }
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditPreFinalYear;
