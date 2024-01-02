import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
  facebookUrl: string;
  instagramUrl: string;
  image: string;
}

interface TeamMemberData {
  name: string;
  linkedInUrl: string;
  EmailID: string;
  designation: string;
  facebookUrl: string;
  instagramUrl: string;
  image: File | null;
}

const EditFinalYear: React.FC = () => {
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
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

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
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/executiveBody/finalYear/updateMember?id=${id}`,
        {
          method: 'PATCH',
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

        setIsModalOpen(false);
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
    }
  };

  const openModalForEdit = (id: string) => {
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

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    }
  };

  return (
    <div>
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
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="linkedInUrl"
              label="Enter LinkedIn URL"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="EmailID"
              label="Enter Email ID"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <Input
              isRequired
              type="text"
              name="designation"
              label="Enter Designation"
              onChange={handleInputChange}
              required
            />
          </div>

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
                >
                  Edit
                </Button>

                <Button
                  className="mx-2"
                  color="danger"
                  onClick={() => handleDeleteMember(member.id)}
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
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
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
                  ...prevData,
                  EmailID: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label="Designation"
              type="text"
              placeholder="Enter the designation"
              value={teamMemberData.designation}
              onChange={(e) =>
                setTeamMemberData((prevData) => ({
                  ...prevData,
                  designation: e.target.value,
                }))
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditFinalYear;
