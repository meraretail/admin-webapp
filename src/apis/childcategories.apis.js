import { axiosPdInstance } from './axios.config';

// ADMIN ONLY
// 3.1 POST '/admin/show-similar-childcategories' - show similar names while typing
export const showSimilarChildCategories = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-childcategories',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 3.2 POST /admin/create-childcategory - admin can add new category
export const adminCreateChildCategory = async (name, subCategoryId) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/create-childcategory',
      data: { name: name, subCategoryId: subCategoryId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER
// 3.3 GET /list-all-childcategories/:subCategoryId - get all categories list
export const listAllChildCategoriesForSubCategory = async (subCategoryId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/list-all-childcategories/${subCategoryId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 3.4 GET /admin/all-childcategories-summary/:subCategoryId - admin can summary at category level
export const adminAllChildCategoriesSummary = async (
  page,
  size,
  search,
  subCategoryId
) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/all-childcategories-summary/${subCategoryId}`,
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

// ADMIN ONLY
// 3.5 GET '/admin/get-childcategory/:childCategoryId' - update category details by Id
export const adminGetChildCategoryById = async (childCategoryId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/get-childcategory/${childCategoryId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 3.6 PUT '/admin/update-childcategory/:childCategoryId' - update category details by Id
export const adminUpdateChildCategoryById = async (
  childCategoryId,
  name,
  subcategoryId
) => {
  try {
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-childcategory/${childCategoryId}`,
      data: { name: name, subcategoryId: subcategoryId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ALL USERS
// 3.7 GET '/get-childcategory-parameters/:childCategoryId' - get category details by Id
export const getChildCategoryParametersById = async (childCategoryId) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/get-childcategory-parameters/${childCategoryId}`,
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
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/update-childcategory-variations',
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
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/update-childcategory-features',
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
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/update-childcategory-details',
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
