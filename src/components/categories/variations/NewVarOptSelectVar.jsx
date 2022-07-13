import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../common/Dropdown';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import {
  adminCreateVariationOption,
  listAllVariations,
  showSimilarVariationOptions,
} from '../../../apis/variations.apis';

const NewVarOptSelectVar = ({ setResSuccess, setResMessage }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [variationList, setVariationList] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState({
    id: '',
  });

  const [loading, setLoading] = useState(false);
  const [varOption, setVarOption] = useState('');
  const [similarVarOptions, setSimilarVarOptions] = useState([]);

  // Step 1: Get all variations list to add variation option
  useEffect(() => {
    listAllVariations()
      .then((response) => {
        setVariationList(response.data.variations);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess]);

  // Step 2: Search similar var options using useEffect with 200ms delay
  useEffect(() => {
    if (varOption === '') {
      setSimilarVarOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariationOptions(varOption);
      setSimilarVarOptions(response.data.varOptions);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [varOption]);

  // Step 3: handle add variation option
  const handleAddVarOption = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminCreateVariationOption(
      selectedVariation.id,
      varOption
    );
    setLoading(false);
    setResMessage(data.message);
    setResSuccess(data.success);
    if (data.success) {
      setVarOption('');
      navigate('/variations');
    }
  };

  return (
    <ItemContainer title='New variation option'>
      <div className='space-y-4'>
        <div>
          <h4 className='text-sm font-semibold mb-2 text-gray-600'>
            Choose variation to add options
          </h4>
          <Dropdown
            list={variationList}
            placeholder='Search variations'
            selectedItem={selectedVariation}
            setSelectedItem={setSelectedVariation}
            onClickOutside={() => setOpen(false)}
            open={open}
            setOpen={setOpen}
            className='w-1/2 pr-2'
          />
        </div>
        {/* choose category to start ends */}
        <div>
          <form
            onSubmit={handleAddVarOption}
            className='grid md:grid-cols-2 gap-4 mt-2'
          >
            <FormInput
              label='Variation option name'
              id='varOption'
              type='text'
              placeholder='Enter variation option name'
              value={varOption}
              onChange={(e) => setVarOption(e.target.value)}
            />
            {loading ? (
              <LoadingButton />
            ) : (
              <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
                Create new variation option
              </Button>
            )}
          </form>
          <SimilarNames
            label='Similar variation options'
            array={similarVarOptions}
          />
        </div>
      </div>
    </ItemContainer>
  );
};

export default NewVarOptSelectVar;
