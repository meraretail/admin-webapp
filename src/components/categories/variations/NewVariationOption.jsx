import { useEffect, useState } from 'react';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import ColorInput from '../../formComponents/ColorInput';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';

import {
  listAllVariations,
  adminGetVariationById,
  adminCreateVariationOption,
  showSimilarVariationOptions,
} from '../../../apis/variations.apis';
import Dropdown from '../../common/Dropdown';

const NewVariationOption = ({
  id,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [loading, setLoading] = useState(false);
  const [variationList, setVariationList] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState({
    id: '',
    name: '',
  });

  const [varOption, setVarOption] = useState({
    name: '',
    value:
      selectedVariation && selectedVariation.name === 'Color' ? '#ffffff' : '',
  });
  const [similarVarOptions, setSimilarVarOptions] = useState([]);

  // Step 1: If variationId exist, get variation details
  // and set selected variation, else get all variations
  useEffect(() => {
    if (id) {
      adminGetVariationById(id)
        .then((res) => {
          setSelectedVariation(res.data.variation);
        })
        .catch((err) => {
          setResSuccess(err.data.success);
          setResMessage(err.data.message);
        });
    } else {
      listAllVariations()
        .then((response) => {
          setVariationList(response.data.variations);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
    }
  }, [id, setResMessage, setResSuccess]);

  // Step 2: Search similar var options using useEffect with 200 mili sec delay
  useEffect(() => {
    if (varOption.name === '') {
      setSimilarVarOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariationOptions(varOption.name);
      setSimilarVarOptions(response.data.varOptions);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [varOption]);

  // Step 3: handle add variation option
  const handleAddVarOption = async (event) => {
    event.preventDefault();
    setLoading(true);
    const variationId = id ? id : selectedVariation.id;
    const { data } = await adminCreateVariationOption(variationId, varOption);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    if (data.success) {
      setVarOption({
        name: '',
        value:
          selectedVariation && selectedVariation.name === 'Color'
            ? '#ffffff'
            : '',
      });
      setRerender(!rerender);
    }
  };

  return (
    <ItemContainer
      title={`Add new variation options for ${selectedVariation.name} variation`}
    >
      <div className='space-y-4 mt-2'>
        <form onSubmit={handleAddVarOption}>
          <div className='grid md:grid-cols-2 gap-4 items-center'>
            {id ? (
              <></>
            ) : (
              <span className='text-sm font-semibold mb-2 text-gray-600'>
                Choose variation to add options
              </span>
            )}
            {id ? (
              <></>
            ) : (
              <Dropdown
                list={variationList}
                placeholder='Search variations'
                value={selectedVariation ? selectedVariation.name : ''}
                setSelectedItem={setSelectedVariation}
              />
            )}
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
            {selectedVariation && selectedVariation.name === 'Color' ? (
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
