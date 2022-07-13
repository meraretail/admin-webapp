import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../common/Dropdown';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';

import {
  adminCreateFeatureOption,
  listAllFeatures,
  showSimilarFeatureOptions,
} from '../../../apis/features.apis';

const NewFeatOptSelectFeat = ({ setResStatus, setResMessage }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [featureList, setFeatureList] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState({
    id: '',
  });

  const [loading, setLoading] = useState(false);
  const [featOption, setFeatOption] = useState('');
  const [similarFeatOptions, setSimilarFeatOptions] = useState([]);

  // Step 1: Get all variations list to add variation option
  useEffect(() => {
    listAllFeatures()
      .then((response) => {
        setFeatureList(response.data.features);
      })
      .catch((error) => {
        setResStatus(error.statusText);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResStatus]);

  // Step 2: Search similar var options using useEffect with 1 sec delay
  useEffect(() => {
    if (featOption === '') {
      setSimilarFeatOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarFeatureOptions(featOption);
      setSimilarFeatOptions(response.data.featOptions);
    }, 1000);

    return () => clearTimeout(delayedResponse);
  }, [featOption]);

  // Step 3: handle add feature option
  const handleAddFeatOption = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { data, statusText } = await adminCreateFeatureOption(
      selectedFeature.id,
      featOption
    );
    setResStatus(statusText);
    if (statusText === 'OK') {
      setFeatOption('');
      navigate('/features');
    }
    setResMessage(data.message);
    setLoading(false);
  };

  return (
    <ItemContainer title='New feature option'>
      <div className='space-y-4'>
        <div>
          <h4 className='text-sm font-semibold mb-2 text-gray-600'>
            Choose feature to add options
          </h4>
          <Dropdown
            list={featureList}
            placeholder='Search feature'
            selectedItem={selectedFeature}
            setSelectedItem={setSelectedFeature}
            onClickOutside={() => setOpen(false)}
            open={open}
            setOpen={setOpen}
            className='w-1/2 pr-2'
          />
        </div>
        {/* choose category to start ends */}
        <div>
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
        </div>
      </div>
    </ItemContainer>
  );
};

export default NewFeatOptSelectFeat;
