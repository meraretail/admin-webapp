import { axiosClient } from './axios-client';

/********** 1. VARIATIONS METHODS ************/

// ADMIN ONLY
// 1.1 POST '/admin/show-similar-Variations' - get list of similar Variations
export const showSimilarVariations = async (name) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/show-similar-variations',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.2 POST /admin/create-Variation - admin can add new Variation
export const adminCreateVariation = async (variation, variesProductOption) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/create-variation',
      data: { name: variation, variesProductOption: variesProductOption },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER
// 1.3 GET /list-all-Variations - get all Variations list
export const listAllVariations = async () => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/list-all-variations',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.4 GET /admin/all-Variations-summary - admin get summary of all Variations
export const adminAllVariationsSummary = async (page, size, search) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/admin/all-variations-summary',
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
// 1.5 GET '/admin/get-variation/:variationId' - get Variation by Id
export const adminGetVariationById = async (variationId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/get-variation/${variationId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.6 PUT '/admin/update-Variation/:VariationId' - Update Variation by Id
export const adminUpdateVariationById = async (
  variationId,
  name,
  variesProductOption
) => {
  try {
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/update-variation/${variationId}`,
      data: { name: name, variesProductOption: variesProductOption },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.7 DELETE '/admin/delete-Variation/:VariationId' - Delete Variation by Id
export const adminDeleteVariationById = async (variationId) => {
  try {
    const response = await axiosClient({
      method: 'delete',
      url: `/api/product/admin/delete-variation/${variationId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/********** 2. Variation OPTIONS METHODS ************/

// ADMIN ONLY
// 2.1 POST '/admin/show-similar-Variation-options' - get list of similar Variation options
export const showSimilarVariationOptions = async (name) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/show-similar-variation-options',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.2 POST /admin/create-Variation-option/:VariationId - admin can add new Variation option
export const adminCreateVariationOption = async (variationId, varOption) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: `/api/product/admin/create-variation-option/${variationId}`,
      data: { name: varOption.name, value: varOption.value },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER
// 2.3 GET /list-all-Variation-options - get all Variations list
export const listAllVariationOptions = async () => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/list-all-variation-options',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.4 GET /admin/all-variation-options-summary-for-variation/:variationId
export const adminAllVariationOptionsSummaryForVariation = async (
  page,
  size,
  search,
  id
) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/all-variation-options-summary-for-variation/${id}`,
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
// 2.5 GET '/admin/Variation-option/:featOptId' - get Variation by Id
export const adminGetVariationOptionById = async (varOptId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/get-variation-option/${varOptId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.6 PUT '/admin/update-variation-option/:varOptId'
export const adminUpdateVariationOptionById = async (varOptId, name) => {
  try {
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/update-variation-option/${varOptId}`,
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.7 DELETE '/admin/delete-Variation-option/:featOptId' - Delete Variation by Id
export const adminDeleteVariationOptionById = async (varOptId) => {
  try {
    const response = await axiosClient({
      method: 'delete',
      url: `/api/product/admin/delete-variation/${varOptId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
