import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import SubCategoriesTable from '../../components/categories/SubCategoriesTable';
import PageTitle from '../../components/common/PageTitle';
import ItemContainer from '../../components/common/ItemContainer';
import EditCategoryImage from '../../components/categories/EditCategoryImage';
import NewSubCategory from '../../components/categories/NewSubCategory';
import EditCatName from '../../components/categories/EditCatName';

const EditCategory = () => {
  const { categoryId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [orgName, setOrgName] = useState(''); // original category name
  const [category, setCategory] = useState({}); // category object

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  // Step 1: get category details by id
  useEffect(() => {
    let isMounted = true;
    const getCategory = async () => {
      setResMessage('');
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/api/product/admin/category-name/${categoryId}`
        );
        isMounted && setCategory(response.data.category);
        isMounted && setOrgName(response.data.category.name);
      } catch (error) {
        isMounted && setResSuccess(error.response.data.success);
        isMounted && setResMessage(error.response.data.message);
      }
      setLoading(false);
    };
    getCategory();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, categoryId]);

  return (
    <div>
      {/* page header */}
      <PageTitle
        title='View/Edit category or Upload Images'
        btnText='Back to previous page'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5.5rem] mb-10 space-y-8'>
        {/* success / error message zone */}
        <SuccErrMsg resMessage={resMessage} resSuccess={resSuccess} />
        {/* success / error message zone ends */}

        {/* Category name update forms start */}
        <ItemContainer title='Edit category name'>
          {/* similar categories found */}
          <EditCatName
            categoryId={categoryId}
            orgName={orgName}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />
          {/* similar categories found ends */}
        </ItemContainer>
        {/* category name update ends */}
        {/* upload category images */}
        <EditCategoryImage
          id={categoryId}
          loading={loading}
          setLoading={setLoading}
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
        {/* upload category images ends */}

        {/* add new sub category */}

        <NewSubCategory
          category={category}
          loading={loading}
          setLoading={setLoading}
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />

        {/* add new sub category ends */}
        {/* sub categories list */}
        <ItemContainer title='Sub categories list for the category'>
          <SubCategoriesTable
            categoryId={categoryId}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
          />
        </ItemContainer>
        {/* sub categories list ends */}
      </div>
    </div>
  );
};

export default EditCategory;
