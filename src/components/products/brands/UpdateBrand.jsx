import { useEffect, useState } from 'react';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import SimilarNames from '../../common/SimilarNames';
import {
  showSimilarBrands,
  adminUpdateBrandById,
} from '../../../apis/products.apis';

const UpdateBrand = ({ brand, setResSuccess, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [newBrand, setNewBrand] = useState('');
  const [similarBrands, setSimilarBrands] = useState([]);

  // console.log('brandTypeId: ', brandTypeId);
  // console.log('brandGeoId: ', brandGeoId);
  // console.log('brand: ', brand);

  // Step 1: Set newBrand name = brand name
  useEffect(() => {
    setNewBrand(brand.name);
  }, [brand]);

  // Step 2: Search similar brands using useEffect with 200ms delay
  useEffect(() => {
    if (newBrand === '' || newBrand === brand.name) {
      setSimilarBrands([]);
      return;
    }

    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarBrands(newBrand);
      setSimilarBrands(response.data.brands);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [newBrand, brand]);

  // step 3: Add new brand
  const handleUpdateBrand = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminUpdateBrandById(brand.id, newBrand);
    setLoading(false);
    setResMessage(data.message);
    setResSuccess(data.success);

    if (data.success) {
      setNewBrand('');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleUpdateBrand}
        className='grid md:grid-cols-2 gap-4 mt-4'
      >
        <FormInput
          label='New brand name'
          id='brand'
          type='text'
          placeholder='Enter brand name'
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            text='Update brand'
            className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
          />
        )}
      </form>
      {/* similar sub categories found */}
      <SimilarNames label='Similar brands found:' array={similarBrands} />
      {/* similar sub categories found ends */}
    </div>
  );
};

export default UpdateBrand;
