import { useState, useEffect } from 'react';
import ImageGallery from '../common/ImageGallery';
import ItemContainer from '../common/ItemContainer';
import MultiImageUpload from '../common/MultiImageUpload';
import {
  getCategoryImagesById,
  adminAddCategoryImagesById,
  adminDeleteCategoryImageById,
  adminSetDefaultCategoryImageById,
} from '../../apis/categories.apis';

const EditCategoryImage = ({
  id,
  setResSuccess,
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
    getCategoryImagesById(id)
      .then((response) => {
        setCatImages(response.data.catImages);
      })
      .catch((error) => {
        setResMessage(error.data.message);
        setResSuccess(error.data.success);
      });
  }, [id, rerender, setResMessage, setResSuccess]);

  // Step 2: Image upload handler
  const imageUploadHandler = async (event) => {
    event.preventDefault();

    if (images && images.length > 0) {
      let formData = new FormData();
      images.forEach((image) => {
        formData.append('catImgs', image.file);
      });

      console.log(formData);

      setLoading(true);
      const { data } = await adminAddCategoryImagesById(
        id,
        formData,
        setProgress
      );
      setLoading(false);
      setResSuccess(data.success);
      setResMessage(data.message);
      setImages([]);
    } else {
      setResSuccess(false);
      setResMessage('Please choose an image to upload');
    }
  };

  console.log('images: ', images);

  const imageDeleteHandler = async (imageId) => {
    setLoading(true);
    const { data } = await adminDeleteCategoryImageById(id, imageId);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);
    setRerender(!rerender);
  };

  const imageDefaultHandler = async (imageId) => {
    setLoading(true);
    const { data } = await adminSetDefaultCategoryImageById(id, imageId);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);
    setRerender(!rerender);
  };
  return (
    <ItemContainer title='Upload category images'>
      {/* image gallery */}
      <ImageGallery
        images={catImages}
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
