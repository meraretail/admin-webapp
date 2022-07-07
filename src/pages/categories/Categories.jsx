import { useState } from 'react';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle from '../../components/common/PageTitle';
import { MdOutlineAddChart } from 'react-icons/md';
import CategoriesTable from '../../components/categories/CategoriesTable';

const Categories = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  // console.log(categories);
  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Categories'
        btnLink='/categories/new'
        btnIcon={<MdOutlineAddChart />}
        btnText='Add new category'
        type='positive'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        <CategoriesTable
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default Categories;
