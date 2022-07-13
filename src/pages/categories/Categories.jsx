import { useState } from 'react';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle from '../../components/common/PageTitle';
import CategoriesTable from '../../components/categories/CategoriesTable';
import NewCategory from '../../components/categories/NewCategory';
import ItemContainer from '../../components/common/ItemContainer';
import MainContainer from '../../components/common/MainContainer';

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
      />
      {/* page header ends */}
      <MainContainer>
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
      </MainContainer>
    </div>
  );
};

export default Categories;
