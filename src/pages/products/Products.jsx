import { useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import MainContainer from '../../components/common/MainContainer';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ProductsTable from '../../components/products/ProductsTable';

const Products = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  return (
    <div>
      <PageTitle
        title='Products'
        btnText='Add new product'
        btnIcon={<MdLibraryAdd />}
        btnLink='/product/new'
        type='positive'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resMessage={resMessage} resSuccess={resSuccess} />
        <ProductsTable
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
      </MainContainer>
    </div>
  );
};

export default Products;
