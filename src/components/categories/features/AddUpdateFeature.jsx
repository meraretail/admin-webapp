import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import { showSimilarFeatures } from '../../../apis/product.apis';

const AddUpdateFeature = ({
  featureId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [feature, setFeature] = useState('');
  const [similarFeatures, setSimilarFeatures] = useState([]);

  // Step 1: If featureId exist, get feature details
  useEffect(() => {
    let isMounted = true;
    const getFeatureById = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'GET',
          url: `/api/product/admin/get-feature/${featureId}`,
        });
        // console.log('response', response);
        setLoading(false);
        isMounted && setFeature(response.data.feature.name);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    featureId && getFeatureById();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setLoading, setResMessage, setResSuccess, featureId]);

  // Step 2: Search similar features using useEffect with 500ms delay
  useEffect(() => {
    if (feature === '') {
      setSimilarFeatures([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarFeatures(feature);
      setSimilarFeatures(response.data.features);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [feature]);

  // Step 3.1: Add new feature
  const handleAddFeature = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: '/api/product/admin/create-feature',
        data: { name: feature },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  // Step 3.2: Update feature
  const handleUpdateFeature = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: `/api/product/admin/update-feature/${featureId}`,
        data: { name: feature },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  return (
    <ItemContainer title={featureId ? 'Update feature' : 'Add new feature'}>
      <form
        onSubmit={featureId ? handleUpdateFeature : handleAddFeature}
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
            {featureId ? 'Update feature' : 'Create new feature'}
          </Button>
        )}
      </form>
      <SimilarNames label='Similar feature names' array={similarFeatures} />
    </ItemContainer>
  );
};

export default AddUpdateFeature;
