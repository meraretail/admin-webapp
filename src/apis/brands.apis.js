import { axiosClient } from './axios-client';

// LOGIN NOT NEEDED
// 1. POST '/show-similar-brands' - similar brands while typing a new brand name
export const showSimilarBrands = async (name) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/show-similar-brands',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN or SELLER
// 2. Add new brand | POST '/add-brand'
export const createBrand = async (name) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/add-brand',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// LOGIN NOT REQUIRED
// 3. Get all brand | GET /get-brands
export const listAllBrands = async () => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/get-brands',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.4 GET /admin/all-categories-summary - admin can summary at category level
export const adminAllCategoriesSummary = async (page, size, search) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/admin/all-categories-summary',
      params: {
        page: page,
        size: size,
        search: search,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.5 GET '/admin/category-name/:categoryId' - get category name by Id
export const adminGetCategoryNameById = async (categoryId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/category-name/${categoryId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.6 PUT '/admin/update-category-name/:categoryId' - update category name by Id
export const adminUpdateCategoryNameById = async (categoryId, name) => {
  try {
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/update-category/${categoryId}`,
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/************* CATEGORY IMAGE API ROUTES ************/

// 1.1 GET '/get-category-images/:categoryId' - get category images by Id
export const getCategoryImagesById = async (categoryId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/get-category-images/${categoryId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.2 POST '/admin/upload-category-images/:categoryId' - add category images by Id
export const adminAddCategoryImagesById = async (
  categoryId,
  formData,
  setProgress
) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: `/api/product/admin/upload-category-images/${categoryId}`,
      data: formData,
      timeout: 60000, // 60 seconds
      onUploadProgress: (progressEvent) => {
        setProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.3 DELETE '/admin/delete-category-image/:categoryId/:imageId' - delete category images by Id
export const adminDeleteCategoryImageById = async (categoryId, imageId) => {
  try {
    const response = await axiosClient({
      method: 'delete',
      url: `/api/product/admin/delete-category-image/${categoryId}/${imageId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.4 PUT '/admin/default-category-image/:categoryId/:imageId' - set default category images by Id
export const adminSetDefaultCategoryImageById = async (categoryId, imageId) => {
  try {
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/default-category-image/${categoryId}/${imageId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
