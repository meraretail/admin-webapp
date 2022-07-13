import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import NewVarOptForVarId from '../../../components/categories/variations/NewVarOptForVarId';
import UpdateVarForm from '../../../components/categories/variations/UpdateVarForm';
import VarOptionTable from '../../../components/categories/variations/VarOptionTable';

const EditVariation = () => {
  const { id } = useParams();
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div className='p-6'>
      <PageTitle
        title='Edit variation and its options'
        link='/variations'
        btnText='Back to all variations'
        type='negative'
      />
      {/* success / error message zone */}
      <SuccErrMsg
        resSuccess={resSuccess}
        resMessage={resMessage}
        showSuccess='true'
      />
      {/* success / error message zone ends */}
      {/* main content starts */}
      <div className='mt-6 space-y-8'>
        <UpdateVarForm
          id={id}
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
        <NewVarOptForVarId
          id={id}
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
        <VarOptionTable
          id={id}
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
      </div>
    </div>
  );
};

export default EditVariation;
