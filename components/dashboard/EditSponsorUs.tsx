import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Input, Card, Textarea } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CardData {
  content: string;
  image: File | null;
}

const EditSponsor: React.FC = () => {
  const [CardData, setCardData] = useState<CardData>({
    content: "",
    image: null,
  });

  const [editCardId, setEditCardId] = useState<string | null>(null);

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setCardData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const fetchCardData = async () => {
    try {
      const response = await fetch("/api/sponsorUs");
      if (response.ok) {
        const data = await response.json();
        setCardData(data.data[0]);
        setEditCardId(data.data[0]._id);
      } else {
        console.error("Failed to fetch Card");
      }
    } catch (error) {
      console.error("Error fetching Card:", error);
    }
  };

  const handlePutCard = async (id: string) => {
    const formData = new FormData();
    Object.entries(CardData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `/api/admin/sponsorUs?id=${id}`;
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        fetchCardData();
        setCardData({
          content: "",
          image: null,
        });
        setEditCardId(null);
        toast.success("Card data saved successfully");
      } else {
        toast.error("Failed to edit Card data");
      }
    } catch (error) {
      toast.error("Error editing Card data");
    }
  };

  return (
    <div>
      <h1 className='flex items-center justify-center font-bold text-3xl'>
        Card Data
      </h1>
      <Card isBlurred className='mt-4 mb-4'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePutCard(editCardId as string);
          }}
        >
          <div className='mt-4 mb-4'>
            <Textarea
              isRequired
              type='text'
              name='content'
              label='Enter Content'
              value={CardData.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='file'
              name='image'
              onChange={handleInputChange}
              required
            />
          </div>

          <Button type='submit'>Save</Button>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default EditSponsor;
