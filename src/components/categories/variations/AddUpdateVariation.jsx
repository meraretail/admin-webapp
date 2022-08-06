import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import { showSimilarVariations } from '../../../apis/product.apis';

const AddUpdateVariation = ({
  variationId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [variation, setVariation] = useState('');
  const [variesProductOption, setVariesProductOption] = useState(false);
  const [similarVariations, setSimilarVariations] = useState([]);

  // Step 1: If variationId exist, get variation details
  useEffect(() => {
    let isMounted = true;
    const getVariationById = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'GET',
          url: `/api/product/admin/get-variation/${variationId}`,
        });
        // console.log('response', response);
        setLoading(false);
        isMounted && setVariation(response.data.variation.name);
        isMounted &&
          setVariesProductOption(response.data.variation.variesProductOption);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    variationId && getVariationById();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setLoading, setResMessage, setResSuccess, variationId]);

  // Step 2: Search similar variations using useEffect with 500ms delay
  useEffect(() => {
    if (variation === '') {
      setSimilarVariations([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariations(variation);
      setSimilarVariations(response.data.variations);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [variation]);

  // Step 3.1: Add new variation
  const handleAddVariation = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: '/api/product/admin/create-variation',
        data: { name: variation, variesProductOption: variesProductOption },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  // Step 3.2: Update variation

  const handleUpdateVariation = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'put',
        url: `/api/product/admin/update-variation/${variationId}`,
        data: { name: variation, variesProductOption: variesProductOption },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  return (
    <ItemContainer
      title={variationId ? 'Update Variation' : 'Add new variation'}
    >
      <div className='space-y-4 mt-2'>
        <form
          onSubmit={variationId ? handleUpdateVariation : handleAddVariation}
        >
          <div className='grid md:grid-cols-2 gap-4 items-center'>
            <span className='text-sm font-semibold text-gray-600'>
              Would product photos change on changing value of variation option?
            </span>
            <select
              className='w-full font-semibold text-sm px-4 py-2 border border-gray-300 outline-none rounded text-gray-600'
              id='variesImage'
              value={variesProductOption}
              onChange={(e) =>
                setVariesProductOption(e.target.value === 'true')
              }
            >
              <option value='false'>No</option>
              <option value='true'>Yes</option>
            </select>

            <FormInput
              label='Variation name'
              id='variation'
              type='text'
              placeholder='Enter variation name'
              value={variation}
              onChange={(e) => setVariation(e.target.value)}
            />
            {loading ? (
              <LoadingButton className='py-2' />
            ) : (
              <Button className='py-2 opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
                {variationId ? 'Update Variation' : 'Create new variation'}
              </Button>
            )}
          </div>
        </form>
        <SimilarNames
          label='Similar variation names'
          array={similarVariations}
        />
      </div>
    </ItemContainer>
  );
};

export default AddUpdateVariation;
