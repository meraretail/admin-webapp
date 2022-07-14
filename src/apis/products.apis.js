import { axiosPdInstance } from './axios.config';

// Contains: 1. Product APIs 2. Brand APIs

/*************** 1. PRODUCT APIs *************/

// ADMIN ONLY
// 1.1 POST '/admin/show-similar-products' - similar products while typing a new product name
export const showSimilarProducts = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-products',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.2 POST /admin/create-product - admin can add new product
export const adminCreateProduct = async (
  childCatId,
  brandId,
  brandName,
  name,
  description,
  pdtGenders
) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/create-product',
      data: {
        childCategoryId: childCatId,
        brandId: brandId,
        brandName: brandName,
        name: name,
        description: description,
        genders: pdtGenders,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.3 GET /admin/all-products-summary - admin can summary at product level
export const adminAllProductsSummary = async (
  page,
  size,
  search,
  childCategoryId
) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/all-products-summary/${childCategoryId}`,
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
// 1.4 GET '/admin/get-product/:productId' - get product name by Id
export const adminGetProductById = async (productId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/get-product/${productId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 1.5 UPDATE PRODUCT -- ADMIN ROUTES

// 1.5.1 PUT '/admin/update-product-basics/:productId' - admin can update product
export const adminUpdateProductBasicsById = async (
  id,
  childCatId,
  brandId,
  name,
  description,
  pdtGenders
) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-product-basics/${id}`,
      data: {
        childCategoryId: childCatId,
        brandId: brandId,
        name: name,
        description: description,
        genders: pdtGenders,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 1.5.2 PUT '/admin/update-product-attributes/:productId' - admin can update product
export const adminUpdateProductAttributesById = async (
  id,
  features,
  details
) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-product-attributes/${id}`,
      data: {
        features: features,
        details: details,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 1.5.3 PUT '/admin/update-product-full/:productId' - admin can update product
export const adminUpdateProductFullById = async (
  id,
  childCatId,
  brandId,
  brandName,
  name,
  description,
  pdtGenders,
  features,
  details
) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-product-full/${id}`,
      data: {
        childCategoryId: childCatId,
        brandId: brandId,
        brandName: brandName,
        name: name,
        description: description,
        genders: pdtGenders,
        features: features,
        details: details,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 1.5.4 PUT '/admin/update-product-variations-skus-stocks-prices/:productId'
export const adminUpdateProductVariationsSkusStocksPricesById = async (
  id,
  variations,
  maxRetailPrice,
  defaultPrice,
  defaultStock,
  skus
) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-product-variations-skus-stocks-prices/${id}`,
      data: {
        variations: variations,
        maxRetailPrice: maxRetailPrice,
        defaultPrice: defaultPrice,
        defaultStock: defaultStock,
        skus: skus,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 1.6 PRODUCT IMAGE METHODS

// ADMIN or SELLER - can upload product images
// 1.6.1 POST '/upload-product-image/:productId/:variationId/:varOptId'
export const uploadProductImagesById = async (
  productId,
  variationId,
  varOptId,
  formData,
  setProgress
) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: `/upload-product-image/${productId}/${variationId}/${varOptId}`,
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

// ADMIN or SELLER - can upload product images
// 1.6.2 PUT '/mark-default-product-image/:productOptionId/:imageId'
export const markDefaultProductImageById = async (productOptionId, imageId) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/mark-default-product-image/${productOptionId}/${imageId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY - can delete product images
// 1.6.3 DELETE '/delete-product-image/:productOptionId/:imageId'
export const deleteProductImageById = async (productOptionId, imageId) => {
  try {
    const response = await axiosPdInstance({
      method: 'delete',
      url: `/delete-product-image/${productOptionId}/${imageId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER - update product option data
// 1.7 PUT '/admin/update-product-option-data/:productOptionId'
export const adminUpdateProductOptionDataById = async (
  productOptionId,
  customName,
  customDesc
) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-product-option-data/${productOptionId}`,
      data: {
        customName: customName,
        customDesc: customDesc,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 1.8 PRODUCT BULK UPLOAD METHODS

// 1.8.1 GET '/get-product-bulk-upload-template'
export const getProductBulkUploadTemplate = async () => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/get-product-bulk-upload-template',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 1.8.2 POST '/bulk-add-products'
export const bulkAddProducts = async (productsArray) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/bulk-add-products',
      data: { productsArray: productsArray },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/*************** 2. BRAND APIs *************/

// ADMIN ONLY
// 2.1 POST '/admin/show-similar-brands' - similar brands while typing a new brand name
export const showSimilarBrands = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-brands',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.2 POST /admin/create-brand - admin can add new brand
export const adminCreateBrand = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/create-brand',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// LOGIN NOT REQUIRED
// 2.3 GET /list-all-brands - get all brands list
export const listAllBrands = async () => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/list-all-brands',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.4 GET /admin/all-brands-summary - admin can summary at brand level
export const adminAllBrandsSummary = async () => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/admin/all-brands-summary',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.5 GET '/admin/get-brand/:brandId' - get brand by Id
export const adminGetBrandById = async (brandId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/get-brand/${brandId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.6 PUT '/admin/update-brand/:brandId' - update brand by Id
export const adminUpdateBrandById = async (brandId, brand) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-brand/${brandId}`,
      data: { brand: brand },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.6 DELETE '/admin/delete-brand/:brandId' - update brand by Id
export const adminDeleteBrandById = async (brandId) => {
  try {
    const response = await axiosPdInstance({
      method: 'delete',
      url: `/admin/delete-brand/${brandId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/********** 3. GENDER ROUTES *************/

// 3.1 GET /list-all-genders - get all genders list
export const listAllGenders = async () => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/list-all-genders',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
