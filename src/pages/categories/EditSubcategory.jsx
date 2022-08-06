import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ChildCategoriesTable from '../../components/categories/ChildCategoriesTable';
import PageTitle from '../../components/common/PageTitle';
import ItemContainer from '../../components/common/ItemContainer';
import EditSubCatName from '../../components/categories/EditSubCatName';
import NewChildCategory from '../../components/categories/NewChildCategory';

const EditSubCategory = () => {
  const { subCategoryId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [subCategory, setSubCategory] = useState({});

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  // Step 1: get sub category details by id
  useEffect(() => {
    let isMounted = true;
    const getCategory = async () => {
      setResMessage('');
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/api/product/admin/subcategory-details/${subCategoryId}`
        );
        isMounted && setSubCategory(response.data.subCategory);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };
    getCategory();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, subCategoryId]);

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
            subCategory={subCategory}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
          />
          {/* category name update ends */}

          {/* add new child category */}

          <NewChildCategory
            subCategory={subCategory}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />

          {/* add new child category ends */}
          {/* child categories list */}
          <ItemContainer title='Child categories list for the sub category'>
            <ChildCategoriesTable
              subCategoryId={subCategoryId}
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
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
