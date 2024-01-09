<<<<<<< Updated upstream
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
=======
// EditPreFinalYear.tsx

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
  useDisclosure,
  Checkbox,
  Input,
  Textarea,
  Card,
  CardHeader,
} from '@nextui-org/react';

interface TeamMember {
  id: string;
  name: string;
  linkedInUrl: string;
  EmailID: string;
  designation: string;
=======
  Input,
  Card,
  CardHeader,
} from "@nextui-org/react";

// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, linkedInUrl, EmailID, designation, facebookUrl, instagramUrl, image]
interface PreFinalYear {
  _id: string;
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
>>>>>>> Stashed changes
  facebookUrl: string;
  instagramUrl: string;
  image: string;
}

<<<<<<< Updated upstream
interface TeamMemberData {
  name: string;
  linkedInUrl: string;
  EmailID: string;
  designation: string;
=======
interface PreFinalYearData {
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
>>>>>>> Stashed changes
  facebookUrl: string;
  instagramUrl: string;
  image: File | null;
}

const EditPreFinalYear: React.FC = () => {
<<<<<<< Updated upstream
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamMemberData, setTeamMemberData] = useState<TeamMemberData>({
    name: '',
    linkedInUrl: '',
    EmailID: '',
    designation: '',
    facebookUrl: '',
    instagramUrl: '',
    image: null,
  });

  const [editMemberId, setEditMemberId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
=======
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
>>>>>>> Stashed changes
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

<<<<<<< Updated upstream
    setTeamMemberData((prevData) => ({
      ...prevData,
      [name]:
        type === 'file' ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const handleAddMember = async () => {
    const formData = new FormData();
    Object.entries(teamMemberData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        'http://localhost:3000/api/admin/executiveBody/preFinalYear/addMember',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        fetchTeamMembers();

        setTeamMemberData({
          name: '',
          linkedInUrl: '',
          EmailID: '',
          designation: '',
          facebookUrl: '',
          instagramUrl: '',
          image: null,
        });
      } else {
        console.error('Failed to add team member');
      }
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleEditMember = async (id: string) => {
    const formData = new FormData();
    Object.entries(teamMemberData).forEach(([key, value]) => {
=======
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
>>>>>>> Stashed changes
      formData.append(key, value);
    });

    try {
      const response = await fetch(
<<<<<<< Updated upstream
        `http://localhost:3000/api/admin/executiveBody/preFinalYear/updateMember?id=${id}`,
        {
          method: 'PATCH',
=======
        "/api/admin/executiveBody/preFinalYear/addMember",
        {
          method: "POST",
>>>>>>> Stashed changes
          body: formData,
        }
      );

      if (response.ok) {
<<<<<<< Updated upstream
        fetchTeamMembers();

        setTeamMemberData({
          name: '',
          linkedInUrl: '',
          EmailID: '',
          designation: '',
          facebookUrl: '',
          instagramUrl: '',
=======
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
>>>>>>> Stashed changes
          image: null,
        });

        setIsModalOpen(false);
<<<<<<< Updated upstream
        setEditMemberId(null);
      } else {
        console.error('Failed to edit team member');
      }
    } catch (error) {
      console.error('Error editing team member:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/executiveBody?year=k21'
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setTeamMembers(data.result);
        } else {
          console.error('Team members data is not an array:', data);
        }
      } else {
        console.error('Failed to fetch team members');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
=======
        setEditPreFinalYearId(null);
      } else {
        console.error("Failed to edit PreFinalYear");
      }
    } catch (error) {
      console.error("Error editing PreFinalYear:", error);
>>>>>>> Stashed changes
    }
  };

  const openModalForEdit = (id: string) => {
<<<<<<< Updated upstream
    const memberToEdit = teamMembers.find((member) => member.id === id);

    if (!memberToEdit) {
      console.error('Team member not found for editing');
      return;
    }

    setTeamMemberData({
      name: memberToEdit.name,
      linkedInUrl: memberToEdit.linkedInUrl,
      EmailID: memberToEdit.EmailID,
      designation: memberToEdit.designation,
      facebookUrl: memberToEdit.facebookUrl,
      instagramUrl: memberToEdit.instagramUrl,
      image: null, // Assuming image should not be edited in this example
    });

    setEditMemberId(id);

=======
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
>>>>>>> Stashed changes
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
<<<<<<< Updated upstream
    setEditMemberId(null);
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/executiveBody/preFinalYear/deleteMember?id=${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        fetchTeamMembers();
      } else {
        console.error('Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
=======
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
>>>>>>> Stashed changes
    }
  };

  return (
    <div>
<<<<<<< Updated upstream
      <Card isBlurred className="mt-4 mb-4">
        <CardHeader className="items-center text-center justify-center text-xl font-bold">
          Add Team Member
        </CardHeader>

        <form onSubmit={handleAddMember}>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="name"
              label="Enter Member Name"
=======
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
>>>>>>> Stashed changes
              onChange={handleInputChange}
              required
            />
          </div>
<<<<<<< Updated upstream
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="linkedInUrl"
              label="Enter LinkedIn URL"
=======
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='EmailID'
              label='Enter Email ID'
>>>>>>> Stashed changes
              onChange={handleInputChange}
              required
            />
          </div>
<<<<<<< Updated upstream
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="EmailID"
              label="Enter Email ID"
=======
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='designation'
              label='Enter Designation'
>>>>>>> Stashed changes
              onChange={handleInputChange}
              required
            />
          </div>
<<<<<<< Updated upstream
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="designation"
              label="Enter Designation"
=======
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='linkedinUrl'
              label='Enter LinkedIn Url'
>>>>>>> Stashed changes
              onChange={handleInputChange}
              required
            />
          </div>
<<<<<<< Updated upstream

          <div className="mt-4 mb-4">
            <div className="mb-2">Upload Member Image (Required)</div>
            <Input
              isRequired
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
            />
          </div>
          <Button type="submit">Add Member</Button>
        </form>
      </Card>

      <Card isBlurred className="mt-4 mb-4">
        <CardHeader className="items-center text-center justify-center text-xl font-bold">
          Edit Existing Team Members
        </CardHeader>
        <ul className="flex flex-wrap items-center justify-center text-center mt-4 mb-4">
          {teamMembers.map((member) => (
            <li className="mx-4 mt-4 mb-4" key={member.id}>
              <div>{member.name}</div>
              <div className="flex">
                <Button
                  className="mx-2"
                  onClick={() => openModalForEdit(member.id)}
=======
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
>>>>>>> Stashed changes
                >
                  Edit
                </Button>

                <Button
<<<<<<< Updated upstream
                  className="mx-2"
                  color="danger"
                  onClick={() => handleDeleteMember(member.id)}
=======
                  className='mx-2'
                  color='danger'
                  onClick={() => handleDeletePreFinalYear(PreFinalYear._id)}
>>>>>>> Stashed changes
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
<<<<<<< Updated upstream

      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Team Member
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Name"
              placeholder="Enter the member name"
              value={teamMemberData.name}
              onChange={(e) =>
                setTeamMemberData((prevData) => ({
=======
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
>>>>>>> Stashed changes
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
<<<<<<< Updated upstream
            <Input
              isRequired
              label="LinkedIn URL"
              type="text"
              placeholder="Enter the LinkedIn URL"
              value={teamMemberData.linkedInUrl}
              onChange={(e) =>
                setTeamMemberData((prevData) => ({
                  ...prevData,
                  linkedInUrl: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label="Email ID"
              type="text"
              placeholder="Enter the Email ID"
              value={teamMemberData.EmailID}
              onChange={(e) =>
                setTeamMemberData((prevData) => ({
=======

            <Input
              autoFocus
              label='EmailID'
              placeholder='Enter the Email ID'
              value={PreFinalYearData.EmailID}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
>>>>>>> Stashed changes
                  ...prevData,
                  EmailID: e.target.value,
                }))
              }
            />
            <Input
<<<<<<< Updated upstream
              isRequired
              label="Designation"
              type="text"
              placeholder="Enter the designation"
              value={teamMemberData.designation}
              onChange={(e) =>
                setTeamMemberData((prevData) => ({
=======
              autoFocus
              label='Designation'
              placeholder='Enter the Designation'
              value={PreFinalYearData.designation}
              onChange={(e) =>
                setPreFinalYearData((prevData) => ({
>>>>>>> Stashed changes
                  ...prevData,
                  designation: e.target.value,
                }))
              }
            />
<<<<<<< Updated upstream
          </ModalBody>
=======
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
              onClick={() =>
                handleEditPreFinalYear(editPreFinalYearId as string)
              }
            >
              Save Changes
            </Button>
          </ModalFooter>
>>>>>>> Stashed changes
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditPreFinalYear;
