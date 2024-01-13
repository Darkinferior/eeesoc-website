// EditSMP.tsx

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

interface SMP {
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

interface SMPData {
  year: string;
  projects: Project[];
}

const EditSMP: React.FC = () => {
  const [SMP, setSMP] = useState<any[]>([]);
  const [projectData, setProjectData] = useState<Project>({
    _id: "",
    name: "",
    title: "",
    description: "",
    reportLink: "",
    image: null,
  });
  const [SMPData, setSMPData] = useState<SMPData>({
    year: "",
    projects: [],
  });

  const [editSMPId, setEditSMPId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSMPData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "year") {
      setSMPData((prevData) => ({
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

  const fetchSMPData = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.ProjectList)) {
          setSMP(data.ProjectList[1].yearWiseProjects);
        } else {
          console.error("SMP data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch SMP");
      }
    } catch (error) {
      console.error("Error fetching SMP:", error);
    }
  };

  const handleAddSMP = async () => {
    const formData = new FormData();
    Object.entries(SMPData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Object.entries(projectData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        "/api/admin/projectPrograms/SMP/addProject",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        fetchSMPData();

        setSMPData({
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
        console.error("Failed to add SMP");
      }
    } catch (error) {
      console.error("Error adding SMP:", error);
    }
  };

  const handleEditSMP = async (id: string) => {
    const SMPToEdit = SMP.map((batchWiseSMP) => [
      batchWiseSMP.projects.filter((SMP: SMP) => SMP._id === id),
      batchWiseSMP.year,
    ]).filter((SMP) => SMP[0].length > 0)[0];

    const formData = new FormData();
    Object.entries(SMPData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Object.entries(projectData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `/api/admin/projectPrograms/SMP/updateProject?year=${SMPToEdit[1]}&name=${SMPToEdit[0][0].name}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchSMPData();

        setSMPData({
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
        setEditSMPId(null);
      } else {
        console.error("Failed to edit SMP");
      }
    } catch (error) {
      console.error("Error editing SMP:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const SMPToEdit = SMP.map((batchWiseSMP) => [
      batchWiseSMP.projects.filter((SMP: SMP) => SMP._id === id),
      batchWiseSMP.year,
    ]).filter((SMP) => SMP[0].length > 0)[0];

    if (!SMPToEdit) {
      console.error("SMP not found for editing");
      return;
    }

    setSMPData({
      year: SMPToEdit[1],
      projects: SMPToEdit[0],
    });
    setProjectData(SMPToEdit[0][0]);

    setEditSMPId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditSMPId(null);
  };

  const handleDeleteSMP = async (id: string) => {
    const SMPToEdit = SMP.map((batchWiseSMP) => [
      batchWiseSMP.projects.filter((SMP: SMP) => SMP._id === id),
      batchWiseSMP.year,
    ]).filter((SMP) => SMP[0].length > 0)[0];

    try {
      const url = `/api/admin/projectPrograms/SMP/deleteProject?year=${SMPToEdit[1]}&name=${SMPToEdit[0][0].name}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSMPData();
      } else {
        console.error("Failed to delete SMP");
      }
    } catch (error) {
      console.error("Error deleting SMP:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add SMP Projects
        </CardHeader>

        <form onSubmit={handleAddSMP}>
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
              label='Enter SMP Title'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              type='text'
              name='reportLink'
              label='Enter SMP Report Link'
              onChange={handleInputChange}
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='year'
              label='Enter SMP Year'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Textarea
              isRequired
              type='text'
              name='description'
              label='Enter SMP Description'
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
          <Button type='submit'>Add SMP</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing SMP Project
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {SMP.map((batchWiseSMP) => {
            return batchWiseSMP.projects.map((project: Project) => (
              <li className='mx-4 mt-4 mb-4' key={project._id}>
                <div className='capitalize'>{project.name.toLowerCase()}</div>
                <div className='text-semibold'>{batchWiseSMP.year}</div>
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
                    onClick={() => handleDeleteSMP(project._id)}
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
          <ModalHeader className='flex flex-col gap-1'>Edit SMP</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Name'
              placeholder='Enter the SMP Name'
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
              placeholder='Enter the SMP Title'
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
              placeholder='Enter the SMP Report Link'
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
              placeholder='Enter the SMP Description'
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
              placeholder='Enter the SMP Year'
              value={SMPData.year}
              onChange={(e) =>
                setSMPData((prevData) => ({
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
              onClick={() => handleEditSMP(editSMPId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditSMP;
