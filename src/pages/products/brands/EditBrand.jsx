import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemContainer from '../../../components/common/ItemContainer';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import UpdateBrand from '../../../components/products/brands/UpdateBrand';
import { adminGetBrandById } from '../../../apis/products.apis';
import MainContainer from '../../../components/common/MainContainer';

const EditBrand = () => {
  const { brandId } = useParams();

  const [brand, setBrand] = useState([
    {
      id: '',
      name: '',
      brandGeo: '',
    },
  ]);

  const [resSuccess, setResSuccess] = useState('');
  const [resMessage, setResMessage] = useState('');

  // Step 1: Get details of the brand on page load
  // Note - not to set statusText on page load
  useEffect(() => {
    adminGetBrandById(brandId)
      .then((res) => {
        setBrand(res.data.brand);
      })
      .catch((err) => {
        setResSuccess(err.data.success);
        setResMessage(err.data.message);
      });
  }, [brandId]);

  return (
    <div>
      <PageTitle
        title='Edit Brand'
        btnLink='/brands'
        btnText='See all brands'
        type='positive'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg
          resSuccess={resSuccess}
          resMessage={resMessage}
          showSuccess='true'
        />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <ItemContainer title='Update brand details'>
            {/* current brand type and geo starts */}
            <div className='flex flex-wrap items-start gap-3 pb-2 mt-4'>
              <div className='flex items-start gap-2'>
                <span className='text-violet-600'>Current Brand Type:</span>
                <span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full border text-xs font-bold'>
                  {brand[0].brandType}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-violet-600'>Current Brand Geo:</span>
                <span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full border text-xs font-bold'>
                  {brand[0].brandGeo}
                </span>
              </div>
            </div>
            {/* current brand type and geo ends */}

            <UpdateBrand
              brand={brand[0]}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
            />
          </ItemContainer>
        </div>
      </MainContainer>
    </div>
  );
};

export default EditBrand;
