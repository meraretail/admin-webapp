import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import SimilarNames from '../../common/SimilarNames';
import Dropdown from '../../common/Dropdown';
import { FaRegTimesCircle } from 'react-icons/fa';

const UpdateBrand = ({
  brandId,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  brandTypesList,
  editVisible,
  setEditVisible,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [similarBrands, setSimilarBrands] = useState([]);
  const [brand, setBrand] = useState('');
  const [selectedBrandType, setSelectedBrandType] = useState(null);

  // console.log('brand: ', brand);
  // console.log('selectedBrandType: ', selectedBrandType);

  // Step 1: Get brand name and type from server
  useEffect(() => {
    let isMounted = true;
    const getBrand = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/product/get-brand/${brandId}`
        );
        if (isMounted) {
          setBrand(response.data.brand.name);
          setSelectedBrandType(response.data.brand.brandType);
        }
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    getBrand();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, brandId, setResMessage, setResSuccess]);

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

  // step 3: Update brand
  const handleUpdateBrand = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate.put(
        `/api/product/update-brand/${brandId}`,
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
        setSelectedBrandType(null);
        setEditVisible(!editVisible);
        setRerender(!rerender);
      }
    } catch (error) {
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className='relative'>
      {/* close button */}
      <div className='absolute -top-12 -right-2 bg-white z-20'>
        <button
          className='bg-transparent border-0 text-red-500 opacity-80 hover:opacity-70 p-2 rounded-full'
          onClick={() => setEditVisible(!editVisible)}
        >
          <FaRegTimesCircle className='scale-125' />
        </button>
      </div>
      <form
        onSubmit={handleUpdateBrand}
        className='grid md:grid-cols-3 gap-4 mt-4'
      >
        <FormInput
          label='Brand name'
          id='brand'
          type='text'
          placeholder='Enter new brand name'
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
            Update brand
          </Button>
        )}
      </form>
      {/* similar sub categories found */}
      <SimilarNames label='Similar brands found:' array={similarBrands} />
      {/* similar sub categories found ends */}
    </div>
  );
};

export default UpdateBrand;
