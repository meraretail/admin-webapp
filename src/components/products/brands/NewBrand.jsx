import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import SimilarNames from '../../common/SimilarNames';
import Dropdown from '../../common/Dropdown';

const NewBrand = ({
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  brandTypesList,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [similarBrands, setSimilarBrands] = useState([]);
  const [brand, setBrand] = useState('');
  const [selectedBrandType, setSelectedBrandType] = useState(null);

  // Step 1: Upon typing a new brand name, search similar brands with 200ms delay
  useEffect(() => {
    if (brand === '') {
      setSimilarBrands([]);
      return;
    }

    const delayedResponse = setTimeout(async () => {
      const response = await axiosPrivate.post(
        '/api/product/show-similar-brands',
        JSON.stringify({ name: brand })
      );
      setSimilarBrands(response.data.brands);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [axiosPrivate, brand]);

  // Step 2: Add a new brand
  const handleAddBrand = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate.post(
        '/api/product/add-brand',
        JSON.stringify({
          name: brand,
          brandTypeId: selectedBrandType.id,
        })
      );
      const { success, message } = response.data;
      setResSuccess(success);
      setResMessage(message);
      if (success) {
        setBrand('');
        setRerender(!rerender);
      }
    } catch (error) {
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }

    setLoading(false);
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
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
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
