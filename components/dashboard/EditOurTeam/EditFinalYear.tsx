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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FinalYear {
  _id: string;
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  image: string;
}

interface FinalYearData {
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  image: File | null;
}

const EditFinalYear: React.FC = () => {
  const [FinalYears, setFinalYears] = useState<any[]>([]);
  const [FinalYearData, setFinalYearData] = useState<FinalYearData>({
    name: "",
    EmailID: "",
    designation: "",
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    image: null,
  });

  const [editFinalYearId, setEditFinalYearId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFinalYears();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFinalYearData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const fetchFinalYears = async () => {
    try {
      const response = await fetch("/api/executiveBody");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.k20)) {
          setFinalYears(data.k20);
        } else {
          console.error("Final Years' data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch Final Years' data");
      }
    } catch (error) {
      console.error("Error fetching FinalYears' data:", error);
    }
  };

  const handleAddFinalYear = async () => {
    const formData = new FormData();
    Object.entries(FinalYearData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        "/api/admin/executiveBody/finalYear/addMember",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        fetchFinalYears();

        setFinalYearData({
          name: "",
          EmailID: "",
          designation: "",
          linkedinUrl: "",
          facebookUrl: "",
          instagramUrl: "",
          image: null,
        });

        toast.success("Final Year Executive Body member added successfully");
      } else {
        toast.error("Failed to add Final Year Executive Body member");
      }
    } catch (error) {
      toast.error("Error adding Final Year Executive Body member");
    }
  };

  const handleEditFinalYear = async (id: string) => {
    const formData = new FormData();
    Object.entries(FinalYearData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `/api/admin/executiveBody/finalYear/updateMember?id=${id}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchFinalYears();

        setFinalYearData({
          name: "",
          EmailID: "",
          designation: "",
          linkedinUrl: "",
          facebookUrl: "",
          instagramUrl: "",
          image: null,
        });

        setIsModalOpen(false);
        setEditFinalYearId(null);

        toast.success("Final Year Executive Body member updated successfully");
      } else {
        toast.error("Failed to edit Final Year Executive Body member");
      }
    } catch (error) {
      toast.error("Error editing Final Year Executive Body member");
    }
  };

  const openModalForEdit = (id: string) => {
    const FinalYearToEdit = FinalYears.find(
      (FinalYear) => FinalYear._id === id
    );

    if (!FinalYearToEdit) {
      console.error("FinalYear not found for editing");
      return;
    }

    setFinalYearData({
      name: FinalYearToEdit.name,
      EmailID: FinalYearToEdit.EmailID,
      designation: FinalYearToEdit.designation,
      linkedinUrl: FinalYearToEdit.linkedinUrl,
      facebookUrl: FinalYearToEdit.facebookUrl,
      instagramUrl: FinalYearToEdit.instagramUrl,
      image: FinalYearToEdit.image,
    });

    setEditFinalYearId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditFinalYearId(null);
  };

  const handleDeleteFinalYear = async (id: string) => {
    try {
      const url = `/api/admin/executiveBody/finalYear/deleteMember?id=${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchFinalYears();
        toast.success("Final Year Executive Body member deleted successfully");
      } else {
        toast.error("Failed to delete Final Year Executive Body member");
      }
    } catch (error) {
      toast.error("Error deleting Final Year Executive Body member");
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add Final Year Executive Body
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddFinalYear();
          }}
        >
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
              type='text'
              name='facebookUrl'
              label='Enter Facebook Url'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
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
          Edit Existing Final Year Executive Body
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {FinalYears.map((FinalYear: FinalYear) => (
            <li className='mx-4 mt-4 mb-4' key={FinalYear._id}>
              <div className='capitalize'>{FinalYear.name.toLowerCase()}</div>
              <div className='flex'>
                <Button
                  className='mx-2'
                  onClick={() => openModalForEdit(FinalYear._id)}
                >
                  Edit
                </Button>

                <Button
                  className='mx-2'
                  color='danger'
                  onClick={() => handleDeleteFinalYear(FinalYear._id)}
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
          <ModalHeader className='flex flex-col gap-1'>Edit</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Name'
              placeholder='Enter the Name'
              value={FinalYearData.name}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />

            <Input
              autoFocus
              label='EmailID'
              placeholder='Enter the Email ID'
              value={FinalYearData.EmailID}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
                  ...prevData,
                  EmailID: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Designation'
              placeholder='Enter the Designation'
              value={FinalYearData.designation}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
                  ...prevData,
                  designation: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='LinkedIn Link'
              placeholder='Enter the LinkedIn Link'
              value={FinalYearData.linkedinUrl}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
                  ...prevData,
                  linkedinUrl: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Facebook Link'
              placeholder='Enter the Facebook Link'
              value={FinalYearData.facebookUrl}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
                  ...prevData,
                  facebookUrl: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='instagramUrl'
              placeholder='Enter the Instagram Url'
              value={FinalYearData.instagramUrl}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
                  ...prevData,
                  instagramUrl: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label='Image'
              type='file'
              placeholder='Enter the FinalYear image'
              accept='image/*'
              onChange={(e) =>
                setFinalYearData((prevData) => ({
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
              onClick={() => handleEditFinalYear(editFinalYearId as string)}
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

export default EditFinalYear;
