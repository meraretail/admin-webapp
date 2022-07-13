import { axiosPdInstance } from './axios.config';

/********** 1. FEATURES METHODS ************/

// ADMIN ONLY
// 1.1 POST '/admin/show-similar-features' - get list of similar features
export const showSimilarFeatures = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-features',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.2 POST /admin/create-feature - admin can add new feature
export const adminCreateFeature = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/create-feature',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER
// 1.3 GET /list-all-features - get all features list
export const listAllFeatures = async () => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/list-all-features',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.4 GET /admin/all-features-summary - admin get summary of all features
export const adminAllFeaturesSummary = async (page, size, search) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/admin/all-features-summary',
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
// 1.5 GET '/admin/feature/:featureId' - get feature by Id
export const adminGetFeatureById = async (featureId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/feature/${featureId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.6 PUT '/admin/update-feature/:featureId' - Update feature by Id
export const adminUpdateFeatureById = async (featureId, name) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-feature/${featureId}`,
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.7 DELETE '/admin/delete-feature/:featureId' - Delete feature by Id
export const adminDeleteFeatureById = async (featureId) => {
  try {
    const response = await axiosPdInstance({
      method: 'delete',
      url: `/admin/delete-feature/${featureId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/********** 2. FEATURE OPTIONS METHODS ************/

// ADMIN ONLY
// 2.1 POST '/admin/show-similar-feature-options' - get list of similar feature options
export const showSimilarFeatureOptions = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-feature-options',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.2 POST /admin/create-feature-option/:featureId - admin can add new feature option
export const adminCreateFeatureOption = async (name, featureId) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: `/admin/create-feature-option/${featureId}`,
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER
// 2.3 GET /list-all-feature-options - get all features list
export const listAllFeatureOptions = async () => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/list-all-feature-options',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.4 GET /admin/all-feature-options-summary - admin get summary of all features
export const adminAllFeatureOptionsSummary = async (page, size, search) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/admin/all-feature-options-summary',
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
// 2.5 GET '/admin/feature-option/:featOptId' - get feature by Id
export const adminGetFeatureOptionById = async (featOptId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/feature-option/${featOptId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.6 PUT '/admin/update-feature-option/:featOptId' - Update feature by Id
export const adminUpdateFeatureOptionById = async (featOptId, name) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-feature-option/${featOptId}`,
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.7 DELETE '/admin/delete-feature-option/:featOptId' - Delete feature by Id
export const adminDeleteFeatureOptionById = async (featOptId) => {
  try {
    const response = await axiosPdInstance({
      method: 'delete',
      url: `/admin/delete-feature/${featOptId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
