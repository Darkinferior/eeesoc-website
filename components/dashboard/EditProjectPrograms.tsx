import React from "react";
import EditSPP from "./EditProjectPrograms/EditSPP";
import EditSMP from "./EditProjectPrograms/EditSMP";

const EditProjectPrograms = () => {
  return (
    <div>
      <div>
        <h1 className='flex items-center justify-center font-bold text-3xl'>
          Edit SMP
        </h1>
        <EditSMP />
      </div>
      <div>
        <h1 className='flex items-center justify-center font-bold text-3xl'>
          Edit SPP
        </h1>
        <EditSPP />
      </div>
    </div>
  );
};

export default EditProjectPrograms;
