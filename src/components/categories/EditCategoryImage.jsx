import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ImageGallery from '../common/ImageGallery';
import ItemContainer from '../common/ItemContainer';
import MultiImageUpload from '../common/MultiImageUpload';
import { getCategoryImagesById } from '../../apis/categories.apis';

const EditCategoryImage = ({
  id,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Image upload states
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  // Step 1: fetch category images on load - unsecured route
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
      // console.log(formData);

      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'post',
          url: `/api/product/admin/upload-category-images/${id}`,
          data: formData,
          timeout: 60000, // 60 seconds
          onUploadProgress: (progressEvent) => {
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        });
        // console.log(response);
        setLoading(false);

        setResSuccess(response.data.success);
        setResMessage(response.data.message);
        if (response.data.success) {
          setRerender(!rerender);
          setImages([]);
          setProgress(0);
        }
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    } else {
      setResSuccess(false);
      setResMessage('Please choose an image to upload');
    }
  };

  // Step 3: Delete category image handler
  const imageDeleteHandler = async (imageId) => {
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'delete',
        url: `/api/product/admin/delete-category-image/${id}/${imageId}`,
      });
      // console.log(response);
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setRerender(!rerender);
        setImages([]);
        setProgress(0);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  // Step 4: Set default category image handler
  const imageDefaultHandler = async (imageId) => {
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'put',
        url: `/api/product/admin/default-category-image/${id}/${imageId}`,
      });
      // console.log(response);
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setRerender(!rerender);
        setImages([]);
        setProgress(0);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
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
