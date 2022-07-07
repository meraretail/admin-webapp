import { useState } from 'react';

// Importing components
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import SubCategoriesTable from '../../components/categories/SubCategoriesTable';

const SubCategories = () => {
  const [resSuccess, setResSuccess] = useState('');
  const [resMessage, setResMessage] = useState('');

  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Sub Categories'
        btnText='Add new child category'
        btnLink='/child-category/add'
        type='positive'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        <SubCategoriesTable
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default SubCategories;
