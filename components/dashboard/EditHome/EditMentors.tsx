// EditMentors.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
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
} from '@nextui-org/react';

interface Mentor {
  _id: string;
  name: string;
  designation: string;
  department: string;
  areasOfInterest: string[];
  profileLink: string;
  image: string;
}

interface MentorData {
  name: string;
  designation: string;
  department: string;
  areasOfInterest: string;
  profileLink: string;
  image: File | null;
}

const EditMentors: React.FC = () => {
  const [Mentor, setMentor] = useState<any[]>([]);
  const [MentorData, setMentorData] = useState<MentorData>({
    name: '',
    designation: '',
    department: '',
    areasOfInterest: '',
    profileLink: '',
    image: null,
  });

  const [editMentorId, setEditMentorId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMentor();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setMentorData((prevData) => ({
      ...prevData,
      [name]:
        type === 'file' ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const fetchMentor = async () => {
    try {
      const response = await fetch('/api/mentors');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setMentor(data.result);
        } else {
          console.error('Mentor data is not an array:', data);
        }
      } else {
        console.error('Failed to fetch Mentor');
      }
    } catch (error) {
      console.error('Error fetching Mentor:', error);
    }
  };

  const handleAddMentor = async () => {
    const formData = new FormData();
    Object.entries(MentorData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(MentorData, formData);
    try {
      const response = await fetch('/api/admin/mentors/addMentor', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchMentor();

        setMentorData({
          name: '',
          designation: '',
          department: '',
          areasOfInterest: '',
          profileLink: '',
          image: null,
        });
      } else {
        console.error('Failed to add Mentor');
      }
    } catch (error) {
      console.error('Error adding Mentor:', error);
    }
  };

  const handleEditMentor = async (id: string) => {
    const formData = new FormData();
    Object.entries(MentorData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const url = `/api/admin/mentors/updateMentor?id=${id}`;

      const response = await fetch(url, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        fetchMentor();
        setMentorData({
          name: '',
          department: '',
          designation: '',
          areasOfInterest: '',
          profileLink: '',
          image: null,
        });
        setIsModalOpen(false);
        setEditMentorId(null);
      } else {
        console.error('Failed to edit Mentor');
      }
    } catch (error) {
      console.error('Error editing Mentor:', error);
    }
  };

  const openModalForEdit = (id: string) => {
    const MentorToEdit = Mentor.find(
      (eachMentorData) => eachMentorData._id === id
    );
    if (!MentorToEdit) {
      console.error('Mentor not found for editing');
      return;
    }
    setMentorData({
      name: MentorToEdit.name,
      department: MentorToEdit.department,
      designation: MentorToEdit.designation,
      areasOfInterest: MentorToEdit.areasOfInterest,
      profileLink: MentorToEdit.profileLink,
      image: MentorToEdit.image,
    });
    setEditMentorId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMentorId(null);
  };

  const handleDeleteMentor = async (id: string) => {
    const formData = new FormData();
    Object.entries(MentorData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const url = `/api/admin/mentors/deleteMentor?id=${id}`;

      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMentor();
      } else {
        console.error('Failed to delete Mentor');
      }
    } catch (error) {
      console.error('Error deleting Mentor:', error);
    }
  };

  return (
    <div>
      <Card isBlurred className="mt-4 mb-4">
        <CardHeader className="items-center text-center justify-center text-xl font-bold">
          Add Mentor
        </CardHeader>

        <form onSubmit={handleAddMentor}>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="name"
              label="Enter Mentor Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="designation"
              label="Enter Mentor Designation"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="department"
              label="Enter Mentor Department"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="areasOfInterest"
              label="Enter Mentor Areas of Interest (comma seperated)"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="profileLink"
              label="Enter Mentor Profile Link"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Input
              isRequired
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
            />
          </div>
          <Button type="submit">Add Mentor</Button>
        </form>
      </Card>
      <Card isBlurred className="mt-4 mb-4">
        <CardHeader className="items-center text-center justify-center text-xl font-bold">
          Edit Existing Mentor
        </CardHeader>
        <ul className="flex flex-wrap items-center justify-center text-center mt-4 mb-4">
          {Mentor.map((eachMentorData: Mentor) => (
            <li className="mx-4 mt-4 mb-4" key={eachMentorData._id}>
              <div className="capitalize">
                {eachMentorData.name.toLowerCase()}
              </div>
              <div className="flex">
                <Button
                  className="mx-2"
                  onClick={() => openModalForEdit(eachMentorData._id)}
                >
                  Edit
                </Button>

                <Button
                  className="mx-2"
                  color="danger"
                  onClick={() => handleDeleteMentor(eachMentorData._id)}
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
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Edit Mentor</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Name"
              placeholder="Enter the Mentor Name"
              value={MentorData.name}
              onChange={(e) =>
                setMentorData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label="Designation"
              placeholder="Enter the Mentor Designation"
              value={MentorData.designation}
              onChange={(e) =>
                setMentorData((prevData) => ({
                  ...prevData,
                  designation: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label="Department"
              placeholder="Enter the Mentor Department"
              value={MentorData.department}
              onChange={(e) =>
                setMentorData((prevData) => ({
                  ...prevData,
                  department: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label="Areas of Interest"
              placeholder="Enter the Mentor Areas of Interest (comma seperated)"
              value={MentorData.areasOfInterest}
              onChange={(e) =>
                setMentorData((prevData) => ({
                  ...prevData,
                  areasOfInterest: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label="Profile Link"
              placeholder="Enter the Mentor Profile Link"
              value={MentorData.profileLink}
              onChange={(e) =>
                setMentorData((prevData) => ({
                  ...prevData,
                  profileLink: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label="Image"
              type="file"
              placeholder="Enter the Mentor Image"
              onChange={(e) =>
                setMentorData((prevData) => ({
                  ...prevData,
                  [e.target.name]:
                    e.target.type === 'file'
                      ? (e.target as HTMLInputElement).files?.[0]
                      : e.target.value,
                }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={closeModal}>
              Close
            </Button>
            <Button
              color="primary"
              onClick={() => handleEditMentor(editMentorId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditMentors;
