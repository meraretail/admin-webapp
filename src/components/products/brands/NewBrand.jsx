import { useEffect, useState } from 'react';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import SimilarNames from '../../common/SimilarNames';
import {
  showSimilarBrands,
  adminCreateBrand,
} from '../../../apis/products.apis';

const NewBrand = ({ setResSuccess, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState({
    name: '',
    brandGeo: '',
  });
  const [similarBrands, setSimilarBrands] = useState([]);

  // Step 1: Search similar brands using useEffect with 500ms delay
  useEffect(() => {
    if (brand === '') {
      setSimilarBrands([]);
      return;
    }

    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarBrands(brand);
      setSimilarBrands(response.data.brands);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [brand]);

  // step 2: Add new brand
  const handleAddBrand = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminCreateBrand(brand);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);
    if (data.success) {
      setBrand({
        name: '',
        brandGeo: '',
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleAddBrand}
        className='grid md:grid-cols-2 gap-4 mt-4'
      >
        <FormInput
          label='Brand name'
          id='brand'
          type='text'
          placeholder='Enter brand name'
          value={brand ? brand.name : ''}
          onChange={(event) => setBrand({ ...brand, name: event.target.value })}
        />
        <FormInput
          label='Brand geo (e.g. Regional, National, Global)'
          id='brandGeo'
          type='text'
          placeholder='Enter brand geography'
          value={brand ? brand.brandGeo : ''}
          onChange={(event) =>
            setBrand({ ...brand, brandGeo: event.target.value })
          }
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Create new brand
          </Button>
        )}
      </form>
      {/* similar sub categories found */}
      <SimilarNames label='Similar brands found:' array={similarBrands} />
      {/* similar sub categories found ends */}
    </div>
  );
};

export default NewBrand;
