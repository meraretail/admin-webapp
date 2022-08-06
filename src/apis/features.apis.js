import { axiosClient } from './axios-client';

/********** 1. FEATURES METHODS ************/

// ADMIN ONLY

// ADMIN ONLY
// 1.2 POST /admin/create-feature - admin can add new feature
export const adminCreateFeature = async (name) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/create-feature',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER

// ADMIN
// 1.4 GET /admin/all-features-summary - admin get summary of all features
export const adminAllFeaturesSummary = async (page, size, search) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/admin/all-features-summary',
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
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/feature/${featureId}`,
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
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/update-feature/${featureId}`,
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
    const response = await axiosClient({
      method: 'delete',
      url: `/api/product/admin/delete-feature/${featureId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/********** 2. FEATURE OPTIONS METHODS ************/

// ADMIN ONLY
// 2.2 POST /admin/create-feature-option/:featureId - admin can add new feature option
export const adminCreateFeatureOption = async (name, featureId) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: `/api/product/admin/create-feature-option/${featureId}`,
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER

// ADMIN
// 2.4 GET /admin/all-feature-options-summary - admin get summary of all features
export const adminAllFeatureOptionsSummary = async (page, size, search) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/admin/all-feature-options-summary',
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
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/feature-option/${featOptId}`,
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
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/update-feature-option/${featOptId}`,
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
    const response = await axiosClient({
      method: 'delete',
      url: `/api/product/admin/delete-feature/${featOptId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
