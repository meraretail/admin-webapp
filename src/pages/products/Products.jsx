import { useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ProductsTable from '../../components/products/ProductsTable';

const Products = () => {
  const [resSuccess, setResSuccess] = useState('');
  const [resMessage, setResMessage] = useState('');

  return (
    <div>
      <PageTitle
        title='Products'
        btnText='Add new product'
        btnIcon={<MdLibraryAdd />}
        btnLink='/product/new'
        type='positive'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resMessage={resMessage} resSuccess={resSuccess} />
        <ProductsTable
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default Products;
