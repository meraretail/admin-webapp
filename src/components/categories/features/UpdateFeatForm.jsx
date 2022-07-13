import { useEffect, useState } from 'react';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';

import {
  showSimilarFeatures,
  adminGetFeatureById,
  adminUpdateFeatureById,
} from '../../../apis/features.apis';

const UpdateFeatForm = ({ id, setResStatus, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [orgFeat, setOrgFeat] = useState({}); // original values
  const [feature, setFeature] = useState('');
  const [similarFeatures, setSimilarFeatures] = useState([]);

  // Step 1: fetch feature data
  useEffect(() => {
    setLoading(true);
    adminGetFeatureById(id)
      .then((res) => {
        setOrgFeat(res.data.feature);
        setFeature(res.data.feature.name);
      })
      .catch((err) => {
        setResStatus(err.data.statusText);
        setResMessage(err.data.message);
      });
    setLoading(false);
  }, [id, setResMessage, setResStatus]);

  // Step 2: Search similar features using useEffect with 1 sec delay
  useEffect(() => {
    if (feature === '' || feature === orgFeat.name) {
      setSimilarFeatures([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarFeatures(feature);
      setSimilarFeatures(response.data.features);
    }, 1000);

    return () => clearTimeout(delayedResponse);
  }, [orgFeat, feature]);

  // Step 3: Edit feature
  const handleEditFeature = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await adminUpdateFeatureById(id, feature);
    const { data, statusText } = response;
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);
  };

  return (
    <ItemContainer title='Update feature name'>
      <form
        onSubmit={handleEditFeature}
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
          <Button
            text='Update feature'
            className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
          />
        )}
      </form>
      <SimilarNames label='Similar feature names' array={similarFeatures} />
    </ItemContainer>
  );
};

export default UpdateFeatForm;
