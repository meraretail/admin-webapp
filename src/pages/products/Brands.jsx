import { useState } from 'react';
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
  const [editBrand, setEditBrand] = useState('');

  const handleEditBrand = async (id) => {
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
          <ItemContainer title='Edit brand'>
            <UpdateBrand
              brand={editBrand}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
            />
          </ItemContainer>
        )}
      </MainContainer>
    </div>
  );
};

export default Brands;
