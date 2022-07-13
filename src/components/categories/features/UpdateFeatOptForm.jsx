import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';

import {
  adminGetFeatureOptionById,
  showSimilarFeatureOptions,
  adminUpdateFeatureOptionById,
} from '../../../apis/features.apis';

const UpdateVarOptForm = ({ id, setResStatus, setResMessage }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orgFeatOpt, setOrgFeatOpt] = useState({});
  const [featOption, setFeatOption] = useState('');
  const [similarFeatOptions, setSimilarFeatOptions] = useState([]);

  // Step 1: fetch variation option data
  useEffect(() => {
    setLoading(true);
    adminGetFeatureOptionById(id)
      .then((res) => {
        setOrgFeatOpt(res.data.featureOption);
        setFeatOption(res.data.featureOption.name);
      })
      .catch((err) => {
        setResStatus(err.data.statusText);
        setResMessage(err.data.message);
      });
    setLoading(false);
  }, [id, setResMessage, setResStatus]);

  // Step 2: Search similar variations using useEffect with 1 sec delay
  useEffect(() => {
    if (featOption === '' || featOption === orgFeatOpt.name) {
      setSimilarFeatOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarFeatureOptions(featOption);
      setSimilarFeatOptions(response.data.featureOption);
    }, 1000);

    return () => clearTimeout(delayedResponse);
  }, [orgFeatOpt, featOption]);

  // Step 3: Edit feature option
  const handleEditFeatOption = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await adminUpdateFeatureOptionById(id, featOption);
    const { data, statusText } = response;
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);

    if (statusText === 'OK') {
      setFeatOption('');
      // navigate back
      navigate(-1);
    }
  };

  return (
    <ItemContainer title='Update feature option name'>
      <form
        onSubmit={handleEditFeatOption}
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
            text='Update feature option'
            className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
          />
        )}
      </form>
      <SimilarNames
        label='Similar feature option names'
        array={similarFeatOptions}
      />
    </ItemContainer>
  );
};

export default UpdateVarOptForm;
