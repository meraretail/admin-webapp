import React, { useState, useEffect } from 'react';
import {
  adminDeleteCategoryImageById,
  getCategoryImagesById,
  adminSetDefaultCategoryImageById,
  adminAddCategoryImagesById,
} from '../../apis/categories.apis';
import ImageGallery from '../common/ImageGallery';
import ItemContainer from '../common/ItemContainer';
import MultiImageUpload from '../common/MultiImageUpload';

const EditCategoryImage = ({
  id,
  setResStatus,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Image upload states
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  // Step 1: fetch category images on load
  useEffect(() => {
    getCategoryImagesById(id).then((response) => {
      setCatImages(response.data.catImages);
    });
  }, [id, rerender]);

  // Step 2: Image upload handler
  const imageUploadHandler = async (event) => {
    event.preventDefault();
    if (images) {
      setLoading(true);
      let formData = new FormData();
      images.forEach((image) => {
        formData.append('catImgs', image.file);
      });
      const { data, statusText } = await adminAddCategoryImagesById(
        id,
        formData,
        setProgress
      );
      setLoading(false);
      setResStatus(statusText);
      setResMessage(data.message);
      setImages([]);
    } else {
      setResMessage('Please choose an image to upload');
    }
  };

  const imageDeleteHandler = async (imageId) => {
    const response = await adminDeleteCategoryImageById(id, imageId);
    const { statusText, data } = response;
    setResStatus(statusText);
    setResMessage(data.message);
    setRerender(!rerender);
  };

  const imageDefaultHandler = async (imageId) => {
    const response = await adminSetDefaultCategoryImageById(id, imageId);
    const { statusText, data } = response;
    setResStatus(statusText);
    setResMessage(data.message);
    setRerender(!rerender);
  };
  return (
    <ItemContainer title='Upload category images'>
      {/* image gallery */}
      <ImageGallery
        images={catImages}
        categoryId={id}
        setResStatus={setResStatus}
        setResMessage={setResMessage}
        setRerender={setRerender}
        rerender={rerender}
        imageDeleteHandler={imageDeleteHandler}
        imageDefaultHandler={imageDefaultHandler}
      />
      {/* image gallery ends */}
      <MultiImageUpload
        imageUploadHandler={imageUploadHandler}
        progress={progress}
        images={images}
        setImages={setImages}
        loading={loading}
      />
    </ItemContainer>
  );
};

export default EditCategoryImage;
