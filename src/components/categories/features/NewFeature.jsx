import { useEffect, useState } from 'react';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';

import {
  adminCreateFeature,
  showSimilarFeatures,
} from '../../../apis/features.apis';

const NewFeature = ({ setResSuccess, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState('');
  const [similarFeatures, setSimilarFeatures] = useState([]);

  // Step 1: Search similar features using useEffect with 1 sec delay
  useEffect(() => {
    if (feature === '') {
      setSimilarFeatures([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarFeatures(feature);
      setSimilarFeatures(response.data.features);
    }, 1000);

    return () => clearTimeout(delayedResponse);
  }, [feature]);

  // Step 2: Add new feature
  const handleAddFeature = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminCreateFeature(feature);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    if (data.success) {
      setFeature('');
    }
  };

  return (
    <ItemContainer title='New feature name'>
      <form
        onSubmit={handleAddFeature}
        className='grid md:grid-cols-2 gap-4 mt-2'
      >
        <FormInput
          label='Feature name'
          id='feature'
          type='text'
          placeholder='Enter feature name'
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Create new feature
          </Button>
        )}
      </form>
      <SimilarNames label='Similar feature names' array={similarFeatures} />
    </ItemContainer>
  );
};

export default NewFeature;
