import { useEffect, useState } from 'react';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import {
  adminCreateVariation,
  showSimilarVariations,
} from '../../../apis/variations.apis';

const NewVariation = ({ setResSuccess, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [variation, setVariation] = useState('');
  const [variesImage, setVariesImage] = useState(false);
  const [similarVariations, setSimilarVariations] = useState([]);

  // Step 1: Search similar variations using useEffect with 200ms delay
  useEffect(() => {
    if (variation === '') {
      setSimilarVariations([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariations(variation);
      setSimilarVariations(response.data.variations);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [variation]);

  // Step 2: Add new variation
  const handleAddVariation = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminCreateVariation(variation, variesImage);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    if (data.success) {
      setVariation('');
      setVariesImage(false);
    }
  };

  // console.log('image: ', variesImage);

  return (
    <ItemContainer title='Add new variation name and options'>
      <div className='space-y-4 mt-2'>
        <form onSubmit={handleAddVariation}>
          <div className='grid md:grid-cols-2 gap-4 items-center'>
            <span className='text-sm font-semibold text-gray-600'>
              Would product photos change on changing value of variation option?
            </span>
            <select
              className='w-full font-semibold text-sm px-4 py-2 border border-gray-300 outline-none rounded text-gray-600'
              id='variesImage'
              value={variesImage}
              onChange={(e) => setVariesImage(e.target.value === 'true')}
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
                Create new variation
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

export default NewVariation;
