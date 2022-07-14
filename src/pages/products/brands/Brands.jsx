import { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import BrandsTable from '../../../components/products/brands/BrandsTable';
import MainContainer from '../../../components/common/MainContainer';
import { MdOutlineBookmarkAdd } from 'react-icons/md';

const Brands = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <PageTitle
        title='Brands'
        btnLink='/brand/new'
        btnIcon={<MdOutlineBookmarkAdd />}
        btnText='Add new brand'
        type='positive'
      />
      <MainContainer>
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />

        <BrandsTable
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
      </MainContainer>
    </div>
  );
};

export default Brands;
