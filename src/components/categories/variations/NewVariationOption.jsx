import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import ColorInput from '../../formComponents/ColorInput';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import { listAllVariations } from '../../../apis/product.apis';
import { showSimilarVariationOptions } from '../../../apis/product.apis';
import Dropdown from '../../common/Dropdown';

const NewVariationOption = ({
  variationId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [variationList, setVariationList] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [varOptionName, setVarOptionName] = useState('');
  const [varOptionValue, setVarOptionValue] = useState('');
  const [similarVarOptions, setSimilarVarOptions] = useState([]);

  // console.log('variationId: ', variationId);
  // console.log('variationList: ', variationList);
  // console.log('selectedVariation: ', selectedVariation);

  // Step 1: Get all variations list
  useEffect(() => {
    listAllVariations()
      .then((response) => {
        // console.log('response: ', response);
        setVariationList(response.data.variations);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess]);

  // Step 2: Set selected variation from variationId
  useEffect(() => {
    if (variationId) {
      const selectedVariation = variationList.find(
        (variation) => variation.id === parseInt(variationId)
      );
      setSelectedVariation(selectedVariation);
    }
  }, [variationId, variationList]);

  // Step 3: If selected variation is color, set varOptionValue to #ffffff
  useEffect(() => {
    if (selectedVariation && selectedVariation.name === 'Color') {
      setVarOptionValue('#ffffff');
    }
  }, [selectedVariation]);

  // Step 2: Search similar var options using useEffect with 200 mili sec delay
  useEffect(() => {
    if (varOptionName === '') {
      setSimilarVarOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariationOptions(varOptionName);
      setSimilarVarOptions(response.data.variationOptions);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [varOptionName]);

  // Step 3: handle add variation option
  const handleAddVarOption = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate({
        method: 'post',
        url: `/api/product/admin/create-variation-option/${selectedVariation?.id}`,
        data: { name: varOptionName, value: varOptionValue },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setSimilarVarOptions([]);
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.data.success);
      setResMessage(error.data.message);
    }
  };

  return (
    <ItemContainer title='Add new variation option'>
      <div className='space-y-4 mt-2'>
        <form onSubmit={handleAddVarOption}>
          <div className='grid md:grid-cols-2 gap-4 items-center'>
            <span className='text-sm font-semibold mb-2 text-gray-600'>
              Choose variation to add options
            </span>

            <Dropdown
              list={variationList}
              placeholder='Search variations'
              value={selectedVariation ? selectedVariation.name : ''}
              setSelectedItem={setSelectedVariation}
            />

            <FormInput
              label='Variation option name'
              id='varOption'
              type='text'
              placeholder='Enter variation option name'
              value={varOptionName}
              onChange={(event) => setVarOptionName(event.target.value)}
            />
            {selectedVariation && selectedVariation.name === 'Color' ? (
              <ColorInput
                label='Value (Click icon or type to change)'
                id='varOptValue'
                value={varOptionValue}
                onColorChange={(color) => setVarOptionValue(color.hex)}
                onInputChange={(event) => setVarOptionValue(event.target.value)}
              />
            ) : (
              <FormInput
                label='Option value'
                id='varOptValue'
                type='text'
                placeholder='Enter variation option value'
                value={varOptionValue}
                onChange={(event) => setVarOptionValue(event.target.value)}
              />
            )}
            {loading ? (
              <LoadingButton />
            ) : (
              <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
                Create new variation option
              </Button>
            )}
          </div>
        </form>
        <SimilarNames
          label='Similar variation options'
          array={similarVarOptions}
        />
      </div>
    </ItemContainer>
  );
};

export default NewVariationOption;
