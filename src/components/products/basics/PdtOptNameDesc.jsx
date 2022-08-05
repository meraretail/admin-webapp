import { useState, useEffect } from 'react';
import Dropdown from '../../common/Dropdown';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import SimilarProducts from './SimilarProducts';

const PdtOptNameDesc = ({
  loading,
  rerender,
  product,
  optionsData,
  selectedVariation,
  setSelectedVariation,
  selectedVariationOption,
  setSelectedVariationOption,
  name,
  setName,
  description,
  setDescription,
  handleOptionCustomData,
}) => {
  const [variationList, setVariationList] = useState([]);
  const [variationOptionList, setVariationOptionList] = useState([]);

  // Step 1: set variation list from optionsData
  useEffect(() => {
    let tempVar = [];
    optionsData &&
      optionsData.forEach((item) => {
        const findItem = tempVar.find((i) => i.id === item.variationId);
        if (!findItem) {
          tempVar.push({
            id: item.variationId,
            name: item.variationName,
          });
        }
      });
    // console.log('tempVar', tempVar);
    setVariationList(tempVar);
  }, [optionsData]);

  // Step 2: set variationOptionList from imageVariations based on selectedVariation
  useEffect(() => {
    let tempVar = [];
    if (selectedVariation && optionsData) {
      optionsData.forEach((item) => {
        if (item.variationId === selectedVariation.id) {
          const findItem = tempVar.find((i) => i.id === item.variationOptionId);
          if (!findItem) {
            tempVar.push({
              id: item.variationOptionId,
              name: item.variationOptionName,
            });
          }
        }
      });
    }
    // console.log('tempVar', tempVar);
    setVariationOptionList(tempVar);
  }, [optionsData, selectedVariation]);

  // Step 3: set selected variation and variationOption to first item on page load
  useEffect(() => {
    variationList.length > 0 && setSelectedVariation(variationList[0]);
  }, [variationList, setSelectedVariation]);

  // console.log('product', product);
  // console.log('selectedVariation', selectedVariation);
  // console.log('selectedVariationOption', selectedVariationOption);

  // Step 5: if selectedVariation and selectedVariationOption exist,
  // set name and description from product for selected variation and variationOption
  useEffect(() => {
    if (selectedVariation && selectedVariationOption) {
      const findOption = product.productOptions.find(
        (i) =>
          i.variationId === selectedVariation.id &&
          i.variationOptionId === selectedVariationOption.id
      );
      if (findOption) {
        setName(findOption.customName ? findOption.customName : '');
        setDescription(findOption.customDesc ? findOption.customDesc : '');
      }
    }
  }, [
    product,
    selectedVariation,
    selectedVariationOption,
    setDescription,
    setName,
    rerender,
  ]);

  return (
    <form onSubmit={() => handleOptionCustomData(product.productOptions.id)}>
      <div className='space-y-4'>
        <h4 className='text-sm font-semibold text-gray-600'>
          Choose product variation to update custom name and description for the
          option
        </h4>
        <div className='grid md:grid-cols-2 gap-4'>
          <Dropdown
            list={variationList}
            placeholder='Select variations'
            value={selectedVariation ? selectedVariation.name : ''}
            setSelectedItem={setSelectedVariation}
            className='w-full'
          />
          <Dropdown
            list={variationOptionList}
            placeholder='Select variation option'
            value={selectedVariationOption ? selectedVariationOption.name : ''}
            setSelectedItem={setSelectedVariationOption}
            className='w-full'
          />
        </div>

        <FormInput
          label='Product option name'
          id='product'
          type='text'
          placeholder='Enter custom name for product option'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SimilarProducts
          name={name ? name : ''}
          orgName={product ? product.name : ''}
        />
        <input
          type='text'
          value={description ? description : ''}
          setValue={setDescription}
          placeholder='Describe this product option in 2-3 lines'
        />
        {loading ? (
          <LoadingButton className='bg-blue-50 text-blue-700 border border-blue-700 hover:bg-blue-100' />
        ) : (
          <Button
            text='UPDATE PRODUCT OPTION DETAILS'
            className='opacity-80 py-2 tracking-wider bg-blue-50 text-blue-700 border border-blue-700 hover:bg-blue-100'
          />
        )}
      </div>
    </form>
  );
};

export default PdtOptNameDesc;
