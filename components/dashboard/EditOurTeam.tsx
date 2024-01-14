import React from 'react';
import EditPreFinalYear from './EditOurTeam/EditPreFinalYear';
import EditFinalYear from './EditOurTeam/EditFinalYear';

const EditOurTeam = () => {
  return (
    <div>
      <div>
        <h1 className="flex items-center justify-center font-bold text-3xl">
          Final Year
        </h1>
        <EditFinalYear />
      </div>
      <div>
        <h1 className="flex items-center justify-center font-bold text-3xl">
          Pre-Final Year
        </h1>
        <EditPreFinalYear />
      </div>
    </div>
  );
};

export default EditOurTeam;
