import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import UpdateVarOption from '../../../components/categories/variations/UpdateVarOption';
import MainContainer from '../../../components/common/MainContainer';

const EditVarOption = () => {
  const { id } = useParams();
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  return (
    <div>
      <PageTitle
        title='Edit variation option'
        btnText='Back to edit variation'
        type='negative'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg
          resSuccess={resSuccess}
          resMessage={resMessage}
          showSuccess='true'
        />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <UpdateVarOption
            id={id}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
          />
        </div>
      </MainContainer>
    </div>
  );
};

export default EditVarOption;
