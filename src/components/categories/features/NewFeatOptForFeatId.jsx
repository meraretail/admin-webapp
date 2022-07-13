import { useEffect, useState } from 'react';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import {
  adminCreateFeatureOption,
  showSimilarFeatureOptions,
} from '../../../apis/features.apis';

const NewFeatOptForFeatId = ({
  id,
  setResStatus,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [loading, setLoading] = useState(false);
  const [featOption, setFeatOption] = useState('');
  const [similarFeatOptions, setSimilarFeatOptions] = useState([]);

  // Step 1: Search similar var options using useEffect with 500 mili sec delay
  useEffect(() => {
    if (featOption === '') {
      setSimilarFeatOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarFeatureOptions(featOption);
      setSimilarFeatOptions(response.data.featureOptions);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [featOption]);

  // Step 2: handle add variation option
  const handleAddFeatOption = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, statusText } = await adminCreateFeatureOption(id, featOption);
    setResStatus(statusText);
    if (statusText === 'OK') {
      setFeatOption('');
      setRerender(!rerender);
    }
    setResMessage(data.message);
    setLoading(false);
  };

  return (
    <ItemContainer title='Add new feature option to the feature'>
      <form
        onSubmit={handleAddFeatOption}
        className='grid md:grid-cols-2 gap-4 mt-2'
      >
        <FormInput
          label='Feature option name'
          id='featOption'
          type='text'
          placeholder='Enter feature option name'
          value={featOption}
          onChange={(e) => setFeatOption(e.target.value)}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            text='Create new feature option'
            className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
          />
        )}
      </form>
      <SimilarNames
        label='Similar feature options'
        array={similarFeatOptions}
      />
    </ItemContainer>
  );
};

export default NewFeatOptForFeatId;
