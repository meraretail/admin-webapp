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

const UpdateVarOptForm = ({ id, setResSuccess, setResMessage }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orgVarOpt, setOrgVarOpt] = useState({});
  const [varOption, setVarOption] = useState({
    name: '',
    value: '',
    variation: '',
  });
  const [similarVarOptions, setSimilarVarOptions] = useState([]);

  // console.log('varOption: ', varOption);
  // console.log('orgVarOpt: ', orgVarOpt);

  // Step 1: fetch variation option data
  useEffect(() => {
    setLoading(true);
    adminGetVariationOptionById(id)
      .then((res) => {
        setOrgVarOpt(res.data.varOption);
        setVarOption({
          name: res.data.varOption.name,
          value: res.data.varOption.value,
          variation: res.data.varOption.variation.name,
        });
      })
      .catch((err) => {
        setResSuccess(err.data.success);
        setResMessage(err.data.message);
      });
    setLoading(false);
  }, [id, setResMessage, setResSuccess]);

  // Step 2: Search similar variations using useEffect with 1 sec delay
  useEffect(() => {
    if (varOption.name === '' || varOption.name === orgVarOpt.name) {
      setSimilarVarOptions([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarVariationOptions(varOption.name);
      setSimilarVarOptions(response.data.varOptions);
    }, 1000);

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

  return (
    <ItemContainer title='Update variation option'>
      <form
        onSubmit={handleEditVarOption}
        className='grid md:grid-cols-3 gap-4 mt-2'
      >
        <FormInput
          label='Option name'
          id='varOptName'
          type='text'
          placeholder='Enter variation option name'
          value={varOption.name ? varOption.name : ''}
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
          <Button
            text='Update variation option'
            className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
          />
        )}
      </form>
      <SimilarNames
        label='Similar variation option names'
        array={similarVarOptions}
      />
    </ItemContainer>
  );
};

export default UpdateVarOptForm;
