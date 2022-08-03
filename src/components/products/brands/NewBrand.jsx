import { useEffect, useState } from 'react';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import SimilarNames from '../../common/SimilarNames';
import Dropdown from '../../common/Dropdown';
import {
  showSimilarBrands,
  adminCreateBrand,
  listBrandTypes,
} from '../../../apis/products.apis';

const NewBrand = ({ setResSuccess, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState('');
  const [similarBrands, setSimilarBrands] = useState([]);

  const [brandTypesList, setBrandTypesList] = useState([]);
  const [selectedBrandType, setSelectedBrandType] = useState(null);

  // Step 1: Get list of brand types from server
  useEffect(() => {
    listBrandTypes()
      .then((response) => {
        setBrandTypesList(response.data.brandTypes);
      })
      .catch((error) => {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      });
  }, [setResMessage, setResSuccess]);

  // Step 1: Search similar brands using useEffect with 200ms delay
  useEffect(() => {
    if (brand === '') {
      setSimilarBrands([]);
      return;
    }

    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarBrands(brand);
      setSimilarBrands(response.data.brands);
    }, 200);

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
      setBrand('');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleAddBrand}
        className='grid md:grid-cols-3 gap-4 mt-4'
      >
        <FormInput
          label='Brand name'
          id='brand'
          type='text'
          placeholder='Enter brand name'
          value={brand ? brand.name : ''}
          onChange={(event) => setBrand({ ...brand, name: event.target.value })}
        />
        <Dropdown
          list={brandTypesList}
          placeholder='Search brand type'
          value={selectedBrandType?.name}
          setSelectedItem={setSelectedBrandType}
          className='w-full'
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
