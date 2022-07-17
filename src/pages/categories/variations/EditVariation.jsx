import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/common/PageTitle';
import MainContainer from '../../../components/common/MainContainer';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import UpdateVariation from '../../../components/categories/variations/UpdateVariation';
import NewVariationOption from '../../../components/categories/variations/NewVariationOption';
import VarOptionTable from '../../../components/categories/variations/VarOptionTable';

const EditVariation = () => {
  const { id } = useParams();
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <PageTitle
        title='Edit variation and its options'
        link='/variations'
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
          <UpdateVariation
            id={id}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
          />
          <NewVariationOption
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
      </MainContainer>
    </div>
  );
};

export default EditVariation;
