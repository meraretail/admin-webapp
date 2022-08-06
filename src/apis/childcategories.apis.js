import { axiosClient } from './axios-client';

// ALL USERS
// 3.7 GET '/get-childcategory-parameters/:childCategoryId' - get category details by Id
export const getChildCategoryParametersById = async (childCategoryId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/get-childcategory-parameters/${childCategoryId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/*** CHILD CATEGORY - VARIATIONS, FEATURES & DETAILS APIs ***/

// ADMIN ONLY
// 1.1 POST '/admin/update-childcategory-variations' - admin can update child category variations
export const adminUpdateChildCategoryVariations = async (
  childCategoryId,
  variationName,
  variationId
) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/update-childcategory-variations',
      data: {
        childCategoryId: childCategoryId,
        variationName: variationName,
        variationId: variationId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}; // end of adminUpdateChildCategoryVariation

// ADMIN ONLY
// 1.2 POST '/admin/update-childcategory-features' - admin can update child category features
export const adminUpdateChildCategoryFeatures = async (
  childCategoryId,
  featureName,
  featureId
) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/update-childcategory-features',
      data: {
        childCategoryId: childCategoryId,
        featureName: featureName,
        featureId: featureId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}; // end of adminUpdateChildCategoryFeatures

// ADMIN ONLY
// 1.3 POST '/admin/update-childcategory-details' - admin can update child category details
export const adminUpdateChildCategoryDetails = async (
  childCategoryId,
  detailName,
  detailId
) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/update-childcategory-details',
      data: {
        childCategoryId: childCategoryId,
        detailName: detailName,
        detailId: detailId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}; // end of adminUpdateChildCategoryDetails
