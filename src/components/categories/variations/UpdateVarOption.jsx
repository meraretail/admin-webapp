import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import ColorInput from '../../formComponents/ColorInput';
import {
  showSimilarVariationOptions,
  adminGetVariationOptionById,
  adminUpdateVariationOptionById,
} from '../../../apis/variations.apis';

const UpdateVarOption = ({ id, setResSuccess, setResMessage }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orgVarOpt, setOrgVarOpt] = useState({});
  const [varOption, setVarOption] = useState({});
  const [similarVarOptions, setSimilarVarOptions] = useState([]);

  // console.log('varOption: ', varOption);
  // console.log('orgVarOpt: ', orgVarOpt);

  // Step 1: fetch variation option data
  useEffect(() => {
    setLoading(true);
    adminGetVariationOptionById(id)
      .then((res) => {
        // console.log('variationOption: ', res.data.variationOption);
        setOrgVarOpt(res.data.variationOption[0]);
        setVarOption(res.data.variationOption[0]);
      })
      .catch((err) => {
        setResSuccess(err.data.success);
        setResMessage(err.data.message);
      });
    setLoading(false);
  }, [id, setResMessage, setResSuccess]);

  // Step 2: Search similar variations using useEffect with 200ms delay
  useEffect(() => {
    if (varOption.name === '' || varOption.name === orgVarOpt.name) {
      setSimilarVarOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariationOptions(varOption.name);
      setSimilarVarOptions(response.data.variationOptions);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [orgVarOpt, varOption]);

  // Step 3: Edit variation
  const handleEditVarOption = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminUpdateVariationOptionById(id, varOption);
    setLoading(false);

    setResSuccess(data.success);
    setResMessage(data.message);

    if (data.success) {
      setVarOption('');
      navigate(-1);
    }
  };

  // console.log('varOption: ', varOption.name);

  return (
    <ItemContainer title='Update variation option'>
      <div className='space-y-6 mt-2'>
        <div className='flex items-center gap-4'>
          <span className='font-semibold text-sm text-gray-600'>
            Please update the variation option for variation:
          </span>
          <span className='py-0.5 px-2 rounded-lg bg-gray-50 border border-gray-400 text-gray-600 text-sm font-semibold'>
            {varOption ? varOption.variation : ''}
          </span>
        </div>
        <form
          onSubmit={handleEditVarOption}
          className='grid md:grid-cols-3 gap-4 mt-2'
        >
          <FormInput
            label='Option name'
            id='varOptName'
            type='text'
            placeholder='Enter variation option name'
            value={varOption.name}
            onChange={(event) =>
              setVarOption({ ...varOption, name: event.target.value })
            }
          />
          {orgVarOpt.variation && orgVarOpt.variation.name === 'Color' ? (
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
              Update variation option
            </Button>
          )}
        </form>
        <SimilarNames
          label='Similar variation option names'
          array={similarVarOptions}
        />
      </div>
    </ItemContainer>
  );
};

export default UpdateVarOption;
