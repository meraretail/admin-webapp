import { useState } from 'react';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ChildCategoriesTable from '../../components/categories/ChildCategoriesTable';
import NewChildCategory from '../../components/categories/NewChildCategory';
import ItemContainer from '../../components/common/ItemContainer';

const ChildCategories = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  // console.log(categories);
  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Child Categories'
        btnText='Back to previous page'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5.5rem] mb-10 space-y-6'>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        <NewChildCategory
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          setRerender={setRerender}
          rerender={rerender}
        />
        <ItemContainer title='All child categories summary'>
          <ChildCategoriesTable
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
          />
        </ItemContainer>
      </div>
    </div>
  );
};

export default ChildCategories;
