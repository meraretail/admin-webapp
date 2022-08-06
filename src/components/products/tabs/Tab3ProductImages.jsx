import { useState } from 'react';
import ItemContainer from '../../common/ItemContainer';
import PdtImagesUpload from '../imageStockPrice/PdtImagesUpload';
import ProductImageGallery from '../imageStockPrice/ProductImageGallery';
import { productTabs } from '../../../listItems/productItems/productTabs';
import {
  markDefaultProductImageById,
  uploadProductImagesById,
} from '../../../apis/product.apis';

const Tab3ProductImages = ({
  product,
  activeId,
  setActiveId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  imageVariations,
}) => {
  /********* IMAGE RELATED STATE OPTIONS *********/
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedVariationOption, setSelectedVariationOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  /*************** IMAGE UPLOAD METHOD **************/

  const imageUploadHandler = async (event) => {
    event.preventDefault();
    if (images) {
      setLoading(true);
      let formData = new FormData();
      images.forEach((image) => {
        formData.append('pdtImgs', image);
      });
      const { data } = await uploadProductImagesById(
        product.id,
        selectedVariation.id,
        selectedVariationOption.id,
        formData,
        setProgress
      );
      setLoading(false);
      setResSuccess(data.success);
      setResMessage(data.message);
      setImages([]);

      if (product) {
        setRerender(!rerender);
      }

      if (data.success) {
        // navigate to next tab after 5 seconds delay
        setTimeout(() => {
          if (activeId < productTabs.length) {
            setActiveId(activeId + 1);
          }
        }, 5000);
      }
    } else {
      setResMessage('Please choose an image to upload');
    }
  };

  const imageDefaultHandler = async (imageId, productOptionId) => {
    // console.log('imageId, productOptionId', imageId, productOptionId);
    setLoading(true);
    const { data } = await markDefaultProductImageById(
      productOptionId,
      imageId
    );
    setLoading(false);
    setResMessage(data.message);
    setResSuccess(data.success);
    if (data.success) {
      setRerender(!rerender);
    }
  };

  // console.log('product', product);
  // console.log('imageVariations', imageVariations);

  return (
    <div className='pb-4 space-y-4'>
      <PdtImagesUpload
        loading={loading}
        imageVariations={imageVariations}
        selectedVariation={selectedVariation}
        setSelectedVariation={setSelectedVariation}
        selectedVariationOption={selectedVariationOption}
        setSelectedVariationOption={setSelectedVariationOption}
        images={images}
        setImages={setImages}
        progress={progress}
        setProgress={setProgress}
        imageUploadHandler={imageUploadHandler}
      />
      <hr />
      <h4 className='text-sm pb-2 font-semibold text-gray-600'>
        Uploaded Images
      </h4>
      <div className='space-y-4'>
        {product &&
          product.productOptions &&
          product.productOptions.length > 0 &&
          product.productOptions.map((item, index) => (
            <div key={index}>
              {item.productOptionSellers &&
                item.productOptionSellers[0].isOptionActive && (
                  <ItemContainer
                    title={`${
                      item.variation && item.variation.name
                        ? item.variation.name
                        : ''
                    }: ${
                      item.variationOption && item.variationOption.name
                        ? item.variationOption.name
                        : ''
                    }`}
                  >
                    <ProductImageGallery
                      imageArr={item.productOptionImages}
                      imageDefaultHandler={imageDefaultHandler}
                      imageDeleteHandler={() => {}}
                    />
                  </ItemContainer>
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tab3ProductImages;
