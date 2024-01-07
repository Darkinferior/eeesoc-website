import React from "react";
import EditMentors from "./EditHome/EditMentors";
import EditPresidents from "./EditHome/EditPresidents";

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
    </div>
  );
};

export default EditHome;
