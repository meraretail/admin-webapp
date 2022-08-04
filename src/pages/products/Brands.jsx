import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ItemContainer from '../../components/common/ItemContainer';
import BrandsTable from '../../components/products/brands/BrandsTable';
import MainContainer from '../../components/common/MainContainer';
import NewBrand from '../../components/products/brands/NewBrand';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import UpdateBrand from '../../components/products/brands/UpdateBrand';

const Brands = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editBrandId, setEditBrandId] = useState('');

  // Get list of brandTypes from server
  const axiosPrivate = useAxiosPrivate();
  const [brandTypesList, setBrandTypesList] = useState([]);
  // Step 1: Get list of brand types from server
  useEffect(() => {
    let isMounted = true;
    const getAllBrandTypes = async () => {
      try {
        const response = await axiosPrivate.get(
          '/api/product/list-brand-types'
        );
        isMounted && setBrandTypesList(response.data.brandTypes);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };

    getAllBrandTypes();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setResMessage, setResSuccess]);

  const handleEditBrand = async (id) => {
    setEditBrandId(id);
    setEditVisible(true);
  };

  return (
    <div>
      <PageTitle
        title='Brands'
        btnLink='/brand/new'
        btnIcon={<MdOutlineBookmarkAdd />}
        btnText='Add new brand'
        type='positive'
      />
      <MainContainer>
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        <ItemContainer title='Create new brand'>
          <NewBrand
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            setRerender={setRerender}
            rerender={rerender}
            brandTypesList={brandTypesList}
          />
        </ItemContainer>

        <ItemContainer title='All brands summary'>
          <BrandsTable
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            handleEditBrand={handleEditBrand}
          />
        </ItemContainer>

        {editVisible && (
          <ItemContainer title={`Edit brand for brand id: ${editBrandId}`}>
            <UpdateBrand
              brandId={editBrandId}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
              setRerender={setRerender}
              rerender={rerender}
              brandTypesList={brandTypesList}
              editVisible={editVisible}
              setEditVisible={setEditVisible}
            />
          </ItemContainer>
        )}
      </MainContainer>
    </div>
  );
};

export default Brands;
