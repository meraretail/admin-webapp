import React, { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import NewFeature from '../../../components/categories/features/NewFeature';
import NewFeatOptSelectFeat from '../../../components/categories/features/NewFeatOptSelectFeat';

const AddFeature = () => {
  const [resSuccess, setResSuccess] = useState('');
  const [resMessage, setResMessage] = useState('');

  return (
    <div className='p-6'>
      <PageTitle
        title='Add new feature'
        link='/features'
        btnText='Back to all features'
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
        <NewFeature
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
        <NewFeatOptSelectFeat
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default AddFeature;
