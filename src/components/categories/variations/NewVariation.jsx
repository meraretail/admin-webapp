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
    <ItemContainer title='New variation name'>
      <form onSubmit={handleAddVariation} className='space-y-4'>
        <div className='grid md:grid-cols-2 gap-4 mt-2'>
          <FormInput
            label='Variation name'
            id='variation'
            type='text'
            placeholder='Enter variation name'
            value={variation}
            onChange={(e) => setVariation(e.target.value)}
          />
          {/* variesImage choose from dropdown */}
          <div className='border border-gray-300 rounded flex items-center gap-4 pl-2'>
            <div className='text-sm font-semibold whitespace-nowrap'>
              Does product image varies with change
            </div>
            <select
              className='w-full font-semibold text-sm p-2 border outline-none'
              id='variesImage'
              value={variesImage}
              onChange={(e) => setVariesImage(e.target.value === 'true')}
            >
              <option value='false'>No</option>
              <option value='true'>Yes</option>
            </select>
          </div>
          {/* variesImage ends */}
        </div>
        {loading ? (
          <LoadingButton className='py-2' />
        ) : (
          <Button className='py-2 opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Create new variation
          </Button>
        )}
      </form>
      <SimilarNames label='Similar variation names' array={similarVariations} />
    </ItemContainer>
  );
};

export default NewVariation;
