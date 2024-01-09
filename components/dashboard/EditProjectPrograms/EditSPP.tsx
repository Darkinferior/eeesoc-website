// EditSPP.tsx

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
  Textarea,
} from "@nextui-org/react";

interface SPP {
  _id: string;
  year: string;
  projects: Project[];
}

interface Project {
  _id: string;
  name: string;
  title: string;
  description: string;
  reportLink: string;
  image: File | null;
}

interface SPPData {
  year: string;
  projects: Project[];
}

const EditSPP: React.FC = () => {
  const [SPP, setSPP] = useState<any[]>([]);
  const [projectData, setProjectData] = useState<Project>({
    _id: "",
    name: "",
    title: "",
    description: "",
    reportLink: "",
    image: null,
  });
  const [SPPData, setSPPData] = useState<SPPData>({
    year: "",
    projects: [],
  });

  const [editSPPId, setEditSPPId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSPPData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "year") {
      setSPPData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,
        [name]:
          type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
      }));
    }
  };

  const fetchSPPData = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.ProjectList)) {
          setSPP(data.ProjectList[1].yearWiseProjects);
        } else {
          console.error("SPP data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch SPP");
      }
    } catch (error) {
      console.error("Error fetching SPP:", error);
    }
  };

  const handleAddSPP = async () => {
    const formData = new FormData();
    Object.entries(SPPData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Object.entries(projectData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        "/api/admin/projectPrograms/SPP/addProject",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        fetchSPPData();

        setSPPData({
          year: "",
          projects: [],
        });
        setProjectData({
          _id: "",
          name: "",
          title: "",
          description: "",
          reportLink: "",
          image: null,
        });
      } else {
        console.error("Failed to add SPP");
      }
    } catch (error) {
      console.error("Error adding SPP:", error);
    }
  };

  const handleEditSPP = async (id: string) => {
    const SPPToEdit = SPP.map((batchWiseSPP) => [
      batchWiseSPP.projects.filter((SPP: SPP) => SPP._id === id),
      batchWiseSPP.year,
    ]).filter((SPP) => SPP[0].length > 0)[0];

    const formData = new FormData();
    Object.entries(SPPData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Object.entries(projectData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `/api/admin/projectPrograms/SPP/updateProject?year=${SPPToEdit[1]}&name=${SPPToEdit[0][0].name}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchSPPData();

        setSPPData({
          year: "",
          projects: [],
        });
        setProjectData({
          _id: "",
          name: "",
          title: "",
          description: "",
          reportLink: "",
          image: null,
        });

        setIsModalOpen(false);
        setEditSPPId(null);
      } else {
        console.error("Failed to edit SPP");
      }
    } catch (error) {
      console.error("Error editing SPP:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const SPPToEdit = SPP.map((batchWiseSPP) => [
      batchWiseSPP.projects.filter((SPP: SPP) => SPP._id === id),
      batchWiseSPP.year,
    ]).filter((SPP) => SPP.length > 0)[0];

    if (!SPPToEdit) {
      console.error("SPP not found for editing");
      return;
    }

    setSPPData({
      year: SPPToEdit[1],
      projects: SPPToEdit[0],
    });
    setProjectData(SPPToEdit[0][0]);

    setEditSPPId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditSPPId(null);
  };

  const handleDeleteSPP = async (id: string) => {
    const SPPToEdit = SPP.map((batchWiseSPP) => [
      batchWiseSPP.projects.filter((SPP: SPP) => SPP._id === id),
      batchWiseSPP.year,
    ]).filter((SPP) => SPP.length > 0)[0];

    try {
      const url = `/api/admin/projectPrograms/SPP/deleteProject?year=${SPPToEdit[1]}&name=${SPPToEdit[0][0].name}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSPPData();
      } else {
        console.error("Failed to delete SPP");
      }
    } catch (error) {
      console.error("Error deleting SPP:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add SPP Projects
        </CardHeader>

        <form onSubmit={handleAddSPP}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='name'
              label='Enter Project Name'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='title'
              label='Enter SPP Title'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='reportLink'
              label='Enter SPP Report Link'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='year'
              label='Enter SPP Year'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Textarea
              isRequired
              type='text'
              name='description'
              label='Enter SPP Description'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <div className='mb-2'>Upload Project Image (Required)</div>
            <Input
              isRequired
              type='file'
              name='image'
              onChange={handleInputChange}
              accept='image/*'
            />
          </div>
          <Button type='submit'>Add SPP</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing SPP Project
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {SPP.map((batchWiseSPP) => {
            return batchWiseSPP.projects.map((project: Project) => (
              <li className='mx-4 mt-4 mb-4' key={project._id}>
                <div className='capitalize'>{project.name.toLowerCase()}</div>
                <div className='text-semibold'>{batchWiseSPP.year}</div>
                <div className='flex'>
                  <Button
                    className='mx-2'
                    onClick={() => openModalForEdit(project._id)}
                  >
                    Edit
                  </Button>

                  <Button
                    className='mx-2'
                    color='danger'
                    onClick={() => handleDeleteSPP(project._id)}
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
          <ModalHeader className='flex flex-col gap-1'>Edit SPP</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Name'
              placeholder='Enter the SPP Name'
              value={projectData.name}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />

            <Input
              autoFocus
              label='Title'
              placeholder='Enter the SPP Title'
              value={projectData.title}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Report Link'
              placeholder='Enter the SPP Report Link'
              value={projectData.reportLink}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  reportLink: e.target.value,
                }))
              }
            />
            <Textarea
              autoFocus
              label='Description'
              placeholder='Enter the SPP Description'
              value={projectData.description}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
            <Input
              autoFocus
              label='Year'
              placeholder='Enter the SPP Year'
              value={SPPData.year}
              onChange={(e) =>
                setSPPData((prevData) => ({
                  ...prevData,
                  year: e.target.value,
                }))
              }
            />
            <Input
              isRequired
              label='Image'
              type='file'
              placeholder='Enter the Project image'
              onChange={(e) =>
                setProjectData((prevData) => ({
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
              onClick={() => handleEditSPP(editSPPId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditSPP;
