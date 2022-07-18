import { axiosClient } from './axios-client';

// ADMIN ONLY
// 2.1 POST '/admin/show-similar-subcategories' - show similar names while typing
export const showSimilarSubCategories = async (name) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/show-similar-subcategories',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.2 POST /admin/create-subcategory - admin can add new category
export const adminCreateSubCategory = async (name, categoryId) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/create-subcategory',
      data: { name: name, categoryId: categoryId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// LOGIN NOT REQUIRED
// 2.3 GET /list-all-subcategories/:categoryId - get all categories list
export const listAllSubCategoriesForCategory = async (categoryId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/list-all-subcategories/${categoryId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 2.4 GET /admin/all-subcategories-summary/:categoryId - admin can summary at category level
export const adminAllSubCategoriesSummary = async (
  page,
  size,
  search,
  categoryId
) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/all-subcategories-summary/${categoryId}`,
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

// ALL USERS
// 2.5 GET '/admin/subcategory-details/:subCategoryId' - get category details by Id
export const adminSubcategoryDetailsById = async (subCategoryId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/subcategory-details/${subCategoryId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 2.6 PUT '/admin/update-subcategory/:subCategoryId' - update category details by Id
export const adminUpdateSubCategoryById = async (subCategoryId, name) => {
  try {
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/update-subcategory/${subCategoryId}`,
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
