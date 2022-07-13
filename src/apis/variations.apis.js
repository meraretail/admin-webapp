import { axiosPdInstance } from './axios.config';

/********** 1. VARIATIONS METHODS ************/

// ADMIN ONLY
// 1.1 POST '/admin/show-similar-Variations' - get list of similar Variations
export const showSimilarVariations = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-variations',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.2 POST /admin/create-Variation - admin can add new Variation
export const adminCreateVariation = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/create-variation',
      data: { name: name },
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
    const response = await axiosPdInstance({
      method: 'get',
      url: '/list-all-variations',
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
    const response = await axiosPdInstance({
      method: 'get',
      url: '/admin/all-variations-summary',
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
// 1.5 GET '/admin/Variation/:VariationId' - get Variation by Id
export const adminGetVariationById = async (variationId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/variation/${variationId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.6 PUT '/admin/update-Variation/:VariationId' - Update Variation by Id
export const adminUpdateVariationById = async (variationId, name) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-variation/${variationId}`,
      data: { name: name },
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
    const response = await axiosPdInstance({
      method: 'delete',
      url: `/admin/delete-variation/${variationId}`,
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
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-variation-options',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.2 POST /admin/create-Variation-option/:VariationId - admin can add new Variation option
export const adminCreateVariationOption = async (name, variationId) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: `/admin/create-variation-option/${variationId}`,
      data: { name: name },
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
    const response = await axiosPdInstance({
      method: 'get',
      url: '/list-all-variation-options',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.4 GET /admin/all-Variation-options-summary - admin get summary of all Variations
export const adminAllVariationOptionsSummary = async (page, size, search) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/admin/all-variation-options-summary',
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
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/variation-option/${varOptId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.6 PUT '/admin/update-Variation-option/:featOptId' - Update Variation by Id
export const adminUpdateVariationOptionById = async (varOptId, name) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-variation-option/${varOptId}`,
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
    const response = await axiosPdInstance({
      method: 'delete',
      url: `/admin/delete-variation/${varOptId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
