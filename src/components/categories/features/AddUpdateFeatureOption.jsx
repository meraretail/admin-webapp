import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Dropdown from '../../common/Dropdown';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import { showSimilarFeatureOptions } from '../../../apis/product.apis';
import { listAllFeatures } from '../../../apis/product.apis';
import { FaRegTimesCircle } from 'react-icons/fa';

const AddUpdateFeatureOption = ({
  featureId,
  featOptionId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  editFeatOptVisible,
  setEditFeatOptVisible,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [featureList, setFeatureList] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [featOption, setFeatOption] = useState('');
  const [similarFeatOptions, setSimilarFeatOptions] = useState([]);

  // console.log('featureId: ', featureId);
  // console.log('featureList: ', featureList);
  // console.log('selectedFeature: ', selectedFeature);

  // Step 0. Scroll to bottom of page smoothly on page load
  useEffect(() => {
    if (editFeatOptVisible) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [editFeatOptVisible]);

  // Step 1: Get all features list
  useEffect(() => {
    listAllFeatures()
      .then((response) => {
        // console.log('response: ', response);
        setFeatureList(response.data.features);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess]);

  // Step 2: Set selected feature from featureId
  useEffect(() => {
    if (featureId) {
      const selectedFeature = featureList.find(
        (feature) => feature.id === parseInt(featureId)
      );
      setSelectedFeature(selectedFeature);
    }
  }, [featureId, featureList]);

  // Step 3: set featOption from featOptionId
  useEffect(() => {
    if (featOptionId) {
      const featOption = selectedFeature?.feature_options?.find(
        (option) => option.id === parseInt(featOptionId)
      );
      setFeatOption(featOption?.name);
    }
  }, [featOptionId, selectedFeature]);

  // Step 4: Search similar features using useEffect with 500 mili sec delay
  useEffect(() => {
    if (featOption === '') {
      setSimilarFeatOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarFeatureOptions(featOption);
      setSimilarFeatOptions(response.data.featureOptions);
    }, 1000);

    return () => clearTimeout(delayedResponse);
  }, [featOption]);

  // Step 5.1: handle add feature option
  const handleAddFeatOption = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate({
        method: 'post',
        url: `/api/product/admin/create-feature-option/${selectedFeature?.id}`,
        data: { name: featOption },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setSimilarFeatOptions([]);
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.data.success);
      setResMessage(error.data.message);
    }
  };

  // Step 5.2: update feature option
  const handleUpdateFeatOption = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate({
        method: 'put',
        url: `/api/product/admin/update-feature-option/${selectedFeature?.id}/${featOptionId}`,
        data: { name: featOption },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setSimilarFeatOptions([]);
        setRerender(!rerender);
        setEditFeatOptVisible(!editFeatOptVisible);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.data.success);
      setResMessage(error.data.message);
    }
  };

  return (
    <ItemContainer
      title={featOptionId ? 'Update feature option' : 'Add new feature option'}
    >
      <div className='space-y-4 mt-2 relative'>
        {/* close button */}
        {editFeatOptVisible && (
          <div className='absolute -top-12 -right-2 bg-white z-20'>
            <button
              className='bg-transparent border-0 text-red-500 opacity-80 hover:opacity-70 p-2 rounded-full'
              onClick={() => setEditFeatOptVisible(!editFeatOptVisible)}
            >
              <FaRegTimesCircle className='scale-125' />
            </button>
          </div>
        )}

        {/* feature option form */}
        <form
          onSubmit={featOptionId ? handleUpdateFeatOption : handleAddFeatOption}
        >
          <div className='grid md:grid-cols-2 gap-4 items-center'>
            <span className='text-sm font-semibold mb-2 text-gray-600'>
              Choose variation to add options
            </span>

            <Dropdown
              list={featureList}
              placeholder='Search features'
              value={selectedFeature?.name || ''}
              setSelectedItem={setSelectedFeature}
            />
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
              <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 h-full'>
                {featOptionId
                  ? 'Update feature option'
                  : 'Add new feature option'}
              </Button>
            )}
          </div>
        </form>
        <SimilarNames
          label='Similar feature option names'
          array={similarFeatOptions}
        />
      </div>
    </ItemContainer>
  );
};

export default AddUpdateFeatureOption;
