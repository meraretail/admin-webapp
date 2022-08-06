import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ProductsTable from '../../components/products/ProductsTable';
import PageTitle from '../../components/common/PageTitle';
import ItemContainer from '../../components/common/ItemContainer';
import EditChildCatFeatures from '../../components/categories/EditChildCatFeatures';
import EditChildCatVariations from '../../components/categories/EditChildCatVariations';
import EditChildCatName from '../../components/categories/EditChildCatName';
import EditChildCatDetails from '../../components/categories/EditChildCatDetails';

const EditChildCategory = () => {
  const { childCategoryId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [childCategory, setChildCategory] = useState('');

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  // Step 1: get child category by id
  useEffect(() => {
    let isMounted = true;
    const getChildCategory = async () => {
      setResMessage('');
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'get',
          url: `/api/product/admin/get-childcategory/${childCategoryId}`,
        });
        setLoading(false);
        isMounted && setChildCategory(response.data.childCategory);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    getChildCategory();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, childCategoryId]);

  return (
    <div>
      {/* page header */}
      <PageTitle
        title='View/Edit child category'
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
        {/* User information update forms start */}

        {/* Child category name update forms start */}
        <EditChildCatName
          childCategory={childCategory}
          loading={loading}
          setLoading={setLoading}
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
        {/* child category name update ends */}
        {/* Child category variations, features, infos, details starts */}
        <ItemContainer title='Choose sub category variations, features and details'>
          <div className='mt-4 grid md:grid-cols-2 gap-6'>
            <EditChildCatVariations
              childCategory={childCategory}
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
            />
            <EditChildCatFeatures
              childCategory={childCategory}
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
            />
            <EditChildCatDetails
              childCategory={childCategory}
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
            />
          </div>
        </ItemContainer>
        {/* Child category variations, features, infos, details ends */}

        {/* products list */}
        <ItemContainer title='Products in this child category'>
          <ProductsTable
            childCategoryId={childCategoryId}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
          />
        </ItemContainer>
        {/* products list ends */}
      </div>
    </div>
  );
};

export default EditChildCategory;
