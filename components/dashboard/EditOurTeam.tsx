import React from 'react';
import EditPreFinalYear from './EditOurTeam/EditPreFinalYear';
import EditFinalYear from './EditOurTeam/EditFinalYear';

const EditOurTeam = () => {
  return (
    <div>
      EditOurTeam
      <div>
        <h1>Edit Final Year</h1>
        <EditFinalYear />
      </div>
      <div>
        <h1>Edit Pre-Final Year</h1>
        <EditPreFinalYear />
      </div>
    </div>
  );
};

export default EditOurTeam;
