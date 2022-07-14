import { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import MainContainer from '../../../components/common/MainContainer';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import NewBrand from '../../../components/products/brands/NewBrand';

const AddBrand = () => {
  const [resSuccess, setResSuccess] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div className='p-6'>
      {/* page header */}
      <PageTitle
        title='Add new brand type, brand geo and brand details'
        btnLink='/brands'
        btnText='Back to all brands list'
        type='negative'
      />
      {/* page header ends */}
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg
          resMessage={resMessage}
          resSuccess={resSuccess}
          showSuccess={true}
        />
        {/* success / error message zone ends */}
        {/* User information update forms start */}
        <div className='py-6 space-y-8'>
          <NewBrand
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            setRerender={setRerender}
            rerender={rerender}
          />
        </div>
      </MainContainer>
    </div>
  );
};

export default AddBrand;
