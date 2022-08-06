import { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import MainContainer from '../../../components/common/MainContainer';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import NewVariationOption from '../../../components/categories/variations/NewVariationOption';
import AddUpdateVariation from '../../../components/categories/variations/AddUpdateVariation';

const AddVariation = () => {
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  return (
    <div>
      <PageTitle
        title='Add new variation and options'
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
          <AddUpdateVariation
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
          />
          <NewVariationOption
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
          />
        </div>
      </MainContainer>
    </div>
  );
};

export default AddVariation;
