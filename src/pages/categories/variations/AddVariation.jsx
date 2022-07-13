import { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import NewVariation from '../../../components/categories/variations/NewVariation';
import NewVarOptSelectVar from '../../../components/categories/variations/NewVarOptSelectVar';
import MainContainer from '../../../components/common/MainContainer';

const AddVariation = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  return (
    <div>
      <PageTitle
        title='Add new variation'
        btnLink='/variations'
        btnText='Back to all variations'
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
          <NewVariation
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
          />
          <NewVarOptSelectVar
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
          />
        </div>
      </MainContainer>
    </div>
  );
};

export default AddVariation;
