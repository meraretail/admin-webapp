import { useState } from 'react';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ChildCategoriesTable from '../../components/categories/ChildCategoriesTable';

const ChildCategories = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  // console.log(categories);
  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Child Categories'
        btnText='Add new child category'
        btnLink='/child-category/add'
        type='positive'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg
          resSuccess={resSuccess}
          resMessage={resMessage}
          showSuccess={true}
        />
        {/* success / error message zone ends */}
        <ChildCategoriesTable
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default ChildCategories;
