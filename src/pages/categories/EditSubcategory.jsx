import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ChildCategoriesTable from '../../components/categories/ChildCategoriesTable';
import PageTitle from '../../components/common/PageTitle';
import ItemContainer from '../../components/common/ItemContainer';
import EditSubCatName from '../../components/categories/EditSubCatName';
import { adminSubcategoryDetailsById } from '../../apis/subcategories.apis';
import NewChildCategory from '../../components/categories/NewChildCategory';

const EditSubCategory = () => {
  const { subCategoryId } = useParams();
  const [subCategory, setSubCategory] = useState({});

  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  // force re-render state - to be used in images and child category component
  const [rerender, setRerender] = useState(false);

  // Step 1: get sub category by id
  useEffect(() => {
    adminSubcategoryDetailsById(subCategoryId)
      .then((res) => {
        // console.log(res.data.subCategory);
        setSubCategory(res.data.subCategory);
      })
      .catch((err) => {
        setResSuccess(err.data.success);
        setResMessage(err.data.message);
      });
  }, [subCategoryId]);

  return (
    <div>
      {/* page header */}
      <PageTitle
        title='View/Edit sub category'
        btnText='Back to previous page'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5.5rem] mb-10 space-y-8'>
        {/* success / error message zone */}
        <SuccErrMsg
          resMessage={resMessage}
          resSuccess={resSuccess}
          showSuccess={true}
        />
        {/* success / error message zone ends */}

        <div className='mt-6 space-y-8'>
          {/* Category name update forms start */}
          <EditSubCatName
            id={subCategoryId}
            orgName={subCategory.name}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />
          {/* category name update ends */}

          {/* add new child category */}

          <NewChildCategory
            subCategoryId={subCategoryId}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />

          {/* add new child category ends */}
          {/* child categories list */}
          <ItemContainer title='Child categories list for the sub category'>
            <ChildCategoriesTable
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
              subCategoryId={subCategoryId}
              rerender={rerender}
            />
          </ItemContainer>
          {/* child categories list ends */}
        </div>
      </div>
    </div>
  );
};

export default EditSubCategory;
