import { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import NewVariation from '../../../components/categories/variations/NewVariation';
import NewVarOptSelectVar from '../../../components/categories/variations/NewVarOptSelectVar';

const AddVariation = () => {
  const [resStatus, setResStatus] = useState('');
  const [resMessage, setResMessage] = useState('');

  return (
    <div className='p-6'>
      <PageTitle
        title='Add new variation'
        link='/variations'
        btnText='Back to all variations'
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
        <NewVariation
          setResStatus={setResStatus}
          setResMessage={setResMessage}
        />
        <NewVarOptSelectVar
          setResStatus={setResStatus}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default AddVariation;
