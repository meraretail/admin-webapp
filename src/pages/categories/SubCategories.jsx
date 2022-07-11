import { useState } from 'react';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import SubCategoriesTable from '../../components/categories/SubCategoriesTable';
import NewSubCategory from '../../components/categories/NewSubCategory';
import ItemContainer from '../../components/common/ItemContainer';

const SubCategories = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Sub Categories'
        btnText='Back to previous page'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5.5rem] mb-10 space-y-6'>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        <NewSubCategory
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          setRerender={setRerender}
          rerender={rerender}
        />
        <ItemContainer title='All sub categories summary'>
          <SubCategoriesTable
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
          />
        </ItemContainer>
      </div>
    </div>
  );
};

export default SubCategories;
