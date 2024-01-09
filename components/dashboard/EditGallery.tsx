// EditGallery.tsx

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

interface Gallery {
  _id: string;
  title: string;
  image: string;
}

interface GalleryData {
  title: string;
  image: File | null;
}

const EditGallery: React.FC = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [galleryData, setGalleryData] = useState<GalleryData>({
    title: "",
    image: null,
  });

  const [editGalleryId, setEditGalleryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setGalleryData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/galleryCard");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setGallery(data.data);
        } else {
          console.error("gallery data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch Gallery");
      }
    } catch (error) {
      console.error("Error fetching Gallery:", error);
    }
  };

  const handleAddGallery = async () => {
    const formData = new FormData();
    Object.entries(galleryData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await fetch("/api/admin/gallery/addImage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchGallery();

        setGalleryData({
          title: "",
          image: null,
        });
      } else {
        console.error("Failed to add Gallery");
      }
    } catch (error) {
      console.error("Error adding Gallery:", error);
    }
  };

  const handleEditGallery = async (id: string) => {
    const formData = new FormData();
    Object.entries(galleryData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const url = `/api/admin/gallery/updateImage?id=${id}`;

      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        fetchGallery();
        setGalleryData({
          title: "",
          image: null,
        });
        setIsModalOpen(false);
        setEditGalleryId(null);
      } else {
        console.error("Failed to edit Gallery");
      }
    } catch (error) {
      console.error("Error editing Gallery:", error);
    }
  };

  const openModalForEdit = (id: string) => {
    const galleryToEdit = gallery.find(
      (eachGalleryData) => eachGalleryData._id === id
    );
    if (!galleryToEdit) {
      console.error("Gallery not found for editing");
      return;
    }
    setGalleryData({
      title: galleryToEdit.title,
      image: galleryToEdit.image,
    });
    setEditGalleryId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditGalleryId(null);
  };

  const handleDeleteGallery = async (id: string) => {
    const formData = new FormData();
    Object.entries(galleryData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const url = `/api/admin/gallery/deleteImage?id=${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchGallery();
      } else {
        console.error("Failed to delete Gallery");
      }
    } catch (error) {
      console.error("Error deleting Gallery:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Add Gallery
        </CardHeader>

        <form onSubmit={handleAddGallery}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='title'
              label='Enter Gallery Title'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <div className='mb-2'>Upload Gallery Image (Required)</div>
            <Input
              isRequired
              type='file'
              name='image'
              onChange={handleInputChange}
              accept='image/*'
            />
          </div>
          <Button type='submit'>Add Gallery</Button>
        </form>
      </Card>
      <Card isBlurred className='mt-4 mb-4'>
        <CardHeader className='items-center text-center justify-center text-xl font-bold'>
          Edit Existing gallery
        </CardHeader>
        <ul className='flex flex-wrap items-center justify-center text-center mt-4 mb-4'>
          {gallery.map((eachGalleryData: Gallery) => (
            <li className='mx-4 mt-4 mb-4' key={eachGalleryData._id}>
              <div className='capitalize'>
                {eachGalleryData.title.toLowerCase()}
              </div>
              <div className='flex'>
                <Button
                  className='mx-2'
                  onClick={() => openModalForEdit(eachGalleryData._id)}
                >
                  Edit
                </Button>

                <Button
                  className='mx-2'
                  color='danger'
                  onClick={() => handleDeleteGallery(eachGalleryData._id)}
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
            Edit Gallery
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label='Title'
              placeholder='Enter the Gallery Title'
              value={galleryData.title}
              onChange={(e) =>
                setGalleryData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />

            <Input
              isRequired
              label='Image'
              type='file'
              placeholder='Enter the Gallery image'
              onChange={(e) =>
                setGalleryData((prevData) => ({
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
              onClick={() => handleEditGallery(editGalleryId as string)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditGallery;
