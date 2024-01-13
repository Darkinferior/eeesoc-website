// EditInterviews.tsx

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

interface Interview {
  _id: string;
  name: string;
  company: string;
  mediumLink: string;
  year: string;
  image: string;
}

interface InterviewData {
  name: string;
  company: string;
  mediumLink: string;
  year: string;
  image: File | null;
}

const EditInterviews: React.FC = () => {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [InterviewData, setInterviewData] = useState<InterviewData>({
    name: "",
    company: "",
    mediumLink: "",
    year: "",
    image: null,
  });

  const [editInterviewId, setEditInterviewId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setInterviewData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const fetchInterviews = async () => {
    try {
      const response = await fetch("/api/interviewsAll");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setInterviews(data.result);
        } else {
          console.error("Interviews data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch Interviews");
      }
    } catch (error) {
      console.error("Error fetching Interviews:", error);
    }
  };

  const handleAddInterview = async () => {
    const formData = new FormData();
    Object.entries(InterviewData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(InterviewData, formData);
    try {
      const response = await fetch("/api/admin/interviewsAll/addInterview", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchInterviews();

        setInterviewData({
          name: "",
          company: "",
          mediumLink: "",
          year: "",
          image: null,
        });
      } else {
        console.error("Failed to add Interview");
      }
    } catch (error) {
      console.error("Error adding Interview:", error);
    }
  };

  const handleEditInterview = async (id: string) => {
    const InterviewToEdit = interviews
      .map((batchWiseInterview) => [
        batchWiseInterview.interviews.filter(
          (Interview: Interview) => Interview._id === id
        ),
        batchWiseInterview.year,
      ])
      .filter((Interview) => Interview[0].length > 0)[0];

    const formData = new FormData();
    Object.entries(InterviewData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(InterviewData);

    try {
      const url = `/api/admin/interviewsAll/updateInterview?year=${InterviewToEdit[1]}&name=${InterviewToEdit[0][0].name}&company=${InterviewToEdit[0][0].company}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchInterviews();

        setInterviewData({
          name: "",
          company: "",
          mediumLink: "",
          year: "",
          image: null,
        });

        setIsModalOpen(false);
        setEditInterviewId(null);
      } else {
        console.error("Failed to edit Interview");
      }
    } catch (error) {
      console.error("Error editing Interview:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const InterviewToEdit = interviews
      .map((batchWiseInterview) => [
        batchWiseInterview.interviews.filter(
          (Interview: Interview) => Interview._id === id
        ),
        batchWiseInterview.year,
      ])
      .filter((Interview) => Interview[0].length > 0)[0];

    if (!InterviewToEdit) {
      console.error("Interview not found for editing");
      return;
    }

    setInterviewData({
      name: InterviewToEdit[0][0].name,
      company: InterviewToEdit[0][0].company,
      mediumLink: InterviewToEdit[0][0].mediumLink,
      image: InterviewToEdit[0][0].image,
      year: InterviewToEdit[1],
    });

    setEditInterviewId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditInterviewId(null);
  };

  const handleDeleteInterview = async (id: string) => {
    const InterviewToEdit = interviews
      .map((batchWiseInterview) => [
        batchWiseInterview.interviews.filter(
          (Interview: Interview) => Interview._id === id
        ),
        batchWiseInterview.year,
      ])
      .filter((Interview) => Interview[0].length > 0)[0];
    try {
      const url = `/api/admin/interviewsAll/deleteInterview?year=${InterviewToEdit[1]}&name=${InterviewToEdit[0][0].name}&company=${InterviewToEdit[0][0].company}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchInterviews();
      } else {
        console.error("Failed to delete Interview");
      }
    } catch (error) {
      console.error("Error deleting Interview:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add Interview
        </CardHeader>

        <form onSubmit={handleAddInterview}>
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
              name='position'
              label='Enter Position'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='company'
              label='Enter Company'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='mediumLink'
              label='Enter Medium Url'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='year'
              label='Enter Year'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <div className='mb-2'>Upload Interview Image (Required)</div>
            <Input
              isRequired
              type='file'
              name='image'
              onChange={handleInputChange}
              accept='image/*'
            />
          </div>
          <Button type='submit'>Add Interview</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing Interviews
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {interviews.map((batchWiseInterview) => {
            return batchWiseInterview.interviews.map((Interview: Interview) => (
              <li className='mx-4 mt-4 mb-4' key={Interview._id}>
                <div className='capitalize'>{Interview.name.toLowerCase()}</div>
                <div className='text-semibold'>
                  K'{batchWiseInterview.year % 100}
                </div>
                <div className='flex'>
                  <Button
                    className='mx-2'
                    onClick={() => openModalForEdit(Interview._id)}
                  >
                    Edit
                  </Button>

                  <Button
                    className='mx-2'
                    color='danger'
                    onClick={() => handleDeleteInterview(Interview._id)}
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
          <ModalHeader className='flex flex-col gap-1'>
            Edit Interview
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Name'
              placeholder='Enter the Name'
              value={InterviewData.name}
              onChange={(e) =>
                setInterviewData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='company'
              placeholder='Enter the Company'
              value={InterviewData.company}
              onChange={(e) =>
                setInterviewData((prevData) => ({
                  ...prevData,
                  company: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Medium Link'
              placeholder='Enter the Medium Link'
              value={InterviewData.mediumLink}
              onChange={(e) =>
                setInterviewData((prevData) => ({
                  ...prevData,
                  mediumLink: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label='Image'
              type='file'
              placeholder='Enter the image'
              onChange={(e) =>
                setInterviewData((prevData) => ({
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
              onClick={() => handleEditInterview(editInterviewId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditInterviews;
