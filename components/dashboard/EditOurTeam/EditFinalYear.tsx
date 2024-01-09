<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
=======
// EditFinalYear.tsx

import React, { useState, useEffect, ChangeEvent } from "react";
>>>>>>> Stashed changes
=======
// EditFinalYear.tsx

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
=======
>>>>>>> Stashed changes
  Input,
  Card,
  CardHeader,
} from "@nextui-org/react";

// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, linkedInUrl, EmailID, designation, facebookUrl, instagramUrl, image]
interface FinalYear {
  _id: string;
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  facebookUrl: string;
  instagramUrl: string;
  image: string;
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
interface TeamMemberData {
  name: string;
  linkedInUrl: string;
  EmailID: string;
  designation: string;
=======
=======
>>>>>>> Stashed changes
interface FinalYearData {
  name: string;
  EmailID: string;
  designation: string;
  linkedinUrl: string;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  facebookUrl: string;
  instagramUrl: string;
  image: File | null;
}

const EditFinalYear: React.FC = () => {
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

<<<<<<< Updated upstream
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
        'http://localhost:3000/api/admin/executiveBody/finalYear/addMember',
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
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      formData.append(key, value);
    });

    try {
      const response = await fetch(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        `http://localhost:3000/api/admin/executiveBody/finalYear/updateMember?id=${id}`,
        {
          method: 'PATCH',
=======
        "/api/admin/executiveBody/finalYear/addMember",
        {
          method: "POST",
>>>>>>> Stashed changes
=======
        "/api/admin/executiveBody/finalYear/addMember",
        {
          method: "POST",
>>>>>>> Stashed changes
          body: formData,
        }
      );

      if (response.ok) {
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
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
      } else {
        console.error("Failed to add FinalYear");
      }
    } catch (error) {
      console.error("Error adding FinalYear:", error);
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          image: null,
        });

        setIsModalOpen(false);
<<<<<<< Updated upstream
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
        'http://localhost:3000/api/executiveBody?year=k20'
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
=======
>>>>>>> Stashed changes
        setEditFinalYearId(null);
      } else {
        console.error("Failed to edit FinalYear");
      }
    } catch (error) {
      console.error("Error editing FinalYear:", error);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
  };

  const openModalForEdit = (id: string) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const memberToEdit = teamMembers.find((member) => member.id === id);

    if (!memberToEdit) {
      console.error('Team member not found for editing');
      return;
    }

    // Set the team member data to the form for editing
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
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    setEditMemberId(null);
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/executiveBody/finalYear/deleteMember?id=${id}`,
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
=======
>>>>>>> Stashed changes
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
      } else {
        console.error("Failed to delete FinalYear");
      }
    } catch (error) {
      console.error("Error deleting FinalYear:", error);
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
=======
>>>>>>> Stashed changes
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add Final Year Executive Body
        </CardHeader>
        <form onSubmit={handleAddFinalYear}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='name'
              label='Enter Name'
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
            <Input
              isRequired
              type="text"
              name="linkedInUrl"
              label="Enter LinkedIn URL"
=======
=======
>>>>>>> Stashed changes
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='EmailID'
              label='Enter Email ID'
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
            <Input
              isRequired
              type="text"
              name="EmailID"
              label="Enter Email ID"
=======
=======
>>>>>>> Stashed changes
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='designation'
              label='Enter Designation'
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
            <Input
              isRequired
              type="text"
              name="designation"
              label="Enter Designation"
=======
=======
>>>>>>> Stashed changes
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='linkedinUrl'
              label='Enter LinkedIn Url'
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
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                >
                  Edit
                </Button>

                <Button
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                  className="mx-2"
                  color="danger"
                  onClick={() => handleDeleteMember(member.id)}
=======
                  className='mx-2'
                  color='danger'
                  onClick={() => handleDeleteFinalYear(FinalYear._id)}
>>>>>>> Stashed changes
=======
                  className='mx-2'
                  color='danger'
                  onClick={() => handleDeleteFinalYear(FinalYear._id)}
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
=======
>>>>>>> Stashed changes
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
              value={FinalYearData.name}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes

            <Input
              autoFocus
              label='EmailID'
              placeholder='Enter the Email ID'
              value={FinalYearData.EmailID}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                  ...prevData,
                  EmailID: e.target.value,
                }))
              }
            />
            <Input
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              isRequired
              label="Designation"
              type="text"
              placeholder="Enter the designation"
              value={teamMemberData.designation}
              onChange={(e) =>
                setTeamMemberData((prevData) => ({
=======
=======
>>>>>>> Stashed changes
              autoFocus
              label='Designation'
              placeholder='Enter the Designation'
              value={FinalYearData.designation}
              onChange={(e) =>
                setFinalYearData((prevData) => ({
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                  ...prevData,
                  designation: e.target.value,
                }))
              }
            />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          </ModalBody>
=======
=======
>>>>>>> Stashed changes
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
              onChange={(e) =>
                setFinalYearData((prevData) => ({
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
              onClick={() => handleEditFinalYear(editFinalYearId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditFinalYear;
