import { useState } from 'react';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle from '../../components/common/PageTitle';
import CategoriesTable from '../../components/categories/CategoriesTable';
import NewCategory from '../../components/categories/NewCategory';
import ItemContainer from '../../components/common/ItemContainer';

const Categories = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  // console.log(categories);
  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Categories'
        btnText='Back to previous page'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5.5rem] mb-10 space-y-6'>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        <NewCategory
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          setRerender={setRerender}
          rerender={rerender}
        />

        <ItemContainer title='All categories summary'>
          <CategoriesTable
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
          />
        </ItemContainer>
      </div>
    </div>
  );
};

export default Categories;
