import React, { useState, useEffect } from 'react';
import Dropdown from '../../common/Dropdown';
import ImageUploader from './ImageUploader';

const PdtImagesUpload = ({
  loading,
  imageVariations,
  selectedVariation,
  setSelectedVariation,
  selectedVariationOption,
  setSelectedVariationOption,
  images,
  setImages,
  progress,
  imageUploadHandler,
}) => {
  const [variationList, setVariationList] = useState([]);
  const [variationOptionList, setVariationOptionList] = useState([]);

  // Step 1: set variation list from imageVariations
  useEffect(() => {
    let tempVar = [];
    imageVariations &&
      imageVariations.forEach((item) => {
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
  }, [imageVariations]);

  // Step 2: set selected variation to first item on page load
  useEffect(() => {
    if (variationList.length > 0) {
      setSelectedVariation(variationList[0]);
    }
  }, [setSelectedVariation, variationList]);

  // Step 3: set variationOptionList from imageVariations based on selectedVariation
  useEffect(() => {
    let tempVar = [];
    if (selectedVariation && imageVariations) {
      imageVariations.forEach((item) => {
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
  }, [imageVariations, selectedVariation]);

  // Step 4: set selected variationOption to first item on page load
  useEffect(() => {
    if (variationOptionList.length > 0) {
      setSelectedVariationOption(variationOptionList[0]);
    }
  }, [setSelectedVariationOption, variationOptionList]);

  //   console.log('selectedVariation', selectedVariation);
  //   console.log('selectedVariationOption', selectedVariationOption);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-gray-600">
        Choose variations to upload images
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          list={variationList}
          placeholder="Select variations"
          value={selectedVariation ? selectedVariation.name : ''}
          setSelectedItem={setSelectedVariation}
          className="w-full"
        />
        <Dropdown
          list={variationOptionList}
          placeholder="Select variation option"
          value={selectedVariationOption ? selectedVariationOption.name : ''}
          setSelectedItem={setSelectedVariationOption}
          className="w-full"
        />
      </div>
      <ImageUploader
        loading={loading}
        progress={progress}
        images={images}
        setImages={setImages}
        imageUploadHandler={imageUploadHandler}
      />
    </div>
  );
};

export default PdtImagesUpload;
