import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import UpdateVarOptForm from '../../components/variations/UpdateVarOptForm';

const EditVarOption = () => {
  const { id } = useParams();
  const [resStatus, setResStatus] = useState('');
  const [resMessage, setResMessage] = useState('');

  return (
    <div className='p-6 min-h-screen'>
      <PageTitle
        title='Edit variation option'
        btnText='Back to edit variation'
        type='negative'
      />
      {/* success / error message zone */}
      <SuccErrMsg
        resStatus={resStatus}
        resMessage={resMessage}
        showSuccess='true'
      />
      {/* success / error message zone ends */}
      {/* main content starts */}
      <div className='mt-6 space-y-8'>
        <UpdateVarOptForm
          id={id}
          setResStatus={setResStatus}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default EditVarOption;
