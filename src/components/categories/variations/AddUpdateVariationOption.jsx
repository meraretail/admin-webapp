import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import ColorInput from '../../formComponents/ColorInput';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import Dropdown from '../../common/Dropdown';
import { listAllVariations } from '../../../apis/product.apis';
import { showSimilarVariationOptions } from '../../../apis/product.apis';
import { FaRegTimesCircle } from 'react-icons/fa';

const AddUpdateVariationOption = ({
  variationId,
  varOptionId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  editVarOptVisible,
  setEditVarOptVisible,
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

  // Step 0. Scroll to bottom of page smoothly on page load
  useEffect(() => {
    if (editVarOptVisible) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [editVarOptVisible]);

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

  // Step 3: set varOptionName and varOptionValue from varOptionId
  // Else, If selected variation is color, set varOptionValue to #ffffff
  useEffect(() => {
    if (varOptionId) {
      const varOption = selectedVariation?.variation_options?.find(
        (option) => option.id === parseInt(varOptionId)
      );
      setVarOptionName(varOption?.name);
      setVarOptionValue(varOption?.value);
    } else if (selectedVariation && selectedVariation.name === 'Color') {
      setVarOptionValue('#ffffff');
    }
  }, [selectedVariation, varOptionId]);

  // Step 4: Search similar var options using useEffect with 500 mili sec delay
  useEffect(() => {
    if (varOptionName === '') {
      setSimilarVarOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariationOptions(varOptionName);
      setSimilarVarOptions(response.data.variationOptions);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [varOptionName]);

  // Step 5.1: handle add variation option
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

  // Step 5.2: update variation option
  const handleUpdateVarOption = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate({
        method: 'put',
        url: `/api/product/admin/update-variation-option/${selectedVariation?.id}/${varOptionId}`,
        data: { name: varOptionName, value: varOptionValue },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setSimilarVarOptions([]);
        setRerender(!rerender);
        setEditVarOptVisible(!editVarOptVisible);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.data.success);
      setResMessage(error.data.message);
    }
  };

  return (
    <ItemContainer
      title={
        varOptionId ? 'Update variation option' : 'Add new variation option'
      }
    >
      <div className='space-y-4 mt-2 relative'>
        {/* close button */}
        {editVarOptVisible && (
          <div className='absolute -top-12 -right-2 bg-white z-20'>
            <button
              className='bg-transparent border-0 text-red-500 opacity-80 hover:opacity-70 p-2 rounded-full'
              onClick={() => setEditVarOptVisible(!editVarOptVisible)}
            >
              <FaRegTimesCircle className='scale-125' />
            </button>
          </div>
        )}

        {/* variation option form */}
        <form
          onSubmit={varOptionId ? handleUpdateVarOption : handleAddVarOption}
        >
          <div className='grid md:grid-cols-2 gap-4 items-center'>
            <span className='text-sm font-semibold mb-2 text-gray-600'>
              Choose variation to add options
            </span>

            <Dropdown
              list={variationList}
              placeholder='Search variations'
              value={selectedVariation?.name || ''}
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
              <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 h-full'>
                {varOptionId
                  ? 'Update variation option'
                  : 'Create new variation option'}
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

export default AddUpdateVariationOption;
