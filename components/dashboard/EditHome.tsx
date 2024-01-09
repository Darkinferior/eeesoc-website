import React from "react";
import EditMentors from "./EditHome/EditMentors";
import EditPresidents from "./EditHome/EditPresidents";
import EditRegisterBtn from "./EditHome/EditRegisterBtn";
import EditResultBtn from "./EditHome/EditResultBtn";

const EditHome = () => {
  return (
    <div>
      <div>
        <h1 className='flex items-center justify-center font-bold text-3xl'>
          Edit Presidents
        </h1>
        <EditPresidents />
      </div>
      <div>
        <h1 className='flex items-center justify-center font-bold text-3xl'>
          Edit Mentors
        </h1>
        <EditMentors />
      </div>
      <div>
        <h1 className='flex items-center justify-center font-bold text-3xl'>
          Edit Register Button
        </h1>
        <EditRegisterBtn />
      </div>
      <div>
        <h1 className='flex items-center justify-center font-bold text-3xl'>
          Edit Result Button
        </h1>
        <EditResultBtn />
      </div>
    </div>
  );
};

export default EditHome;
