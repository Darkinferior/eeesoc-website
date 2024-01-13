import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Input, Card } from "@nextui-org/react";

interface BtnData {
  title: string;
  formLink: string;
}

const EditRegisterBtn: React.FC = () => {
  const [BtnData, setBtnData] = useState<BtnData>({
    title: "",
    formLink: "",
  });

  const [editBtnId, setEditBtnId] = useState<string | null>(null);

  useEffect(() => {
    fetchBtn();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBtnData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchBtn = async () => {
    try {
      const response = await fetch("/api/events/register");
      if (response.ok) {
        const data = await response.json();
        setBtnData(data.result);
        setEditBtnId(data.result._id);
      } else {
        console.error("Failed to fetch Btn");
      }
    } catch (error) {
      console.error("Error fetching Btn:", error);
    }
  };

  const handlePutBtn = async (id: string) => {
    const formData = new FormData();
    Object.entries(BtnData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `/api/admin/events/register?id=${id}`;
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        fetchBtn();

        setBtnData({
          title: "",
          formLink: "",
        });

        setEditBtnId(null);
      } else {
        console.error("Failed to edit Btn");
      }
    } catch (error) {
      console.error("Error editing Btn:", error);
    }
  };

  return (
    <div>
      <Card isBlurred className='mt-4 mb-4'>
        <form onSubmit={() => handlePutBtn(editBtnId as string)}>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='title'
              label='Enter Title'
              value={BtnData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mt-4 mb-4'>
            <Input
              isRequired
              type='text'
              name='formLink'
              label='Enter Form Link'
              value={BtnData.formLink}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button type='submit'>Save</Button>
        </form>
      </Card>
    </div>
  );
};

export default EditRegisterBtn;
