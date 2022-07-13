import { useEffect, useState } from 'react';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import ColorInput from '../../formComponents/ColorInput';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';

import {
  adminCreateVariationOption,
  showSimilarVariationOptions,
  adminGetVariationById,
} from '../../../apis/variations.apis';

const NewVarOptForVarId = ({
  id,
  setResStatus,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [loading, setLoading] = useState(false);
  const [variation, setVariation] = useState(null);
  const [varOption, setVarOption] = useState({
    name: '',
    value: variation && variation.name === 'Color' ? '#ffffff' : '',
  });
  const [similarVarOptions, setSimilarVarOptions] = useState([]);

  // console.log('varOption: ', varOption);

  // Step 1: get variation details by Id
  useEffect(() => {
    adminGetVariationById(id)
      .then((res) => {
        setVariation(res.data.variation);
      })
      .catch((err) => {
        setResStatus(err.data.statusText);
        setResMessage(err.data.message);
      });
  }, [id, setResMessage, setResStatus]);

  // Step 2: Search similar var options using useEffect with 500 mili sec delay
  useEffect(() => {
    if (varOption.name === '') {
      setSimilarVarOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariationOptions(varOption.name);
      setSimilarVarOptions(response.data.varOptions);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [varOption]);

  // Step 3: handle add variation option
  const handleAddVarOption = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, statusText } = await adminCreateVariationOption(
      id,
      varOption
    );
    setResStatus(statusText);
    if (statusText === 'OK') {
      setVarOption({
        name: '',
        value: variation && variation.name === 'Color' ? '#ffffff' : '',
      });
      setRerender(!rerender);
    }
    setResMessage(data.message);
    setLoading(false);
  };

  return (
    <ItemContainer title='Add new variation option to the variation'>
      <form
        onSubmit={handleAddVarOption}
        className='grid md:grid-cols-2 gap-4 mt-2'
      >
        <FormInput
          label='Variation option name'
          id='varOption'
          type='text'
          placeholder='Enter variation option name'
          value={varOption.name}
          onChange={(event) =>
            setVarOption({ ...varOption, name: event.target.value })
          }
        />
        {variation && variation.name === 'Color' ? (
          <ColorInput
            label='Value (Click icon or type to change)'
            id='varOptValue'
            value={varOption.value ? varOption.value : '#ffffff'}
            onColorChange={(color) =>
              setVarOption({ ...varOption, value: color.hex })
            }
            onInputChange={(event) =>
              setVarOption({ ...varOption, value: event.target.value })
            }
          />
        ) : (
          <FormInput
            label='Option value'
            id='varOptValue'
            type='text'
            placeholder='Enter variation option value'
            value={varOption.value ? varOption.value : ''}
            onChange={(event) =>
              setVarOption({ ...varOption, value: event.target.value })
            }
          />
        )}
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            text='Create new variation option'
            className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
          />
        )}
      </form>
      <SimilarNames
        label='Similar variation options'
        array={similarVarOptions}
      />
    </ItemContainer>
  );
};

export default NewVarOptForVarId;
