import { axiosInstance } from './axios.config';

/***************** CATEGORIES APIs ***************/

// 1. Admin: Get All Categories | GET /admin/get-all-categories
export const adminGetAllCategories = async (page, size, search) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: '/admin/get-all-categories',
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

/***************** SUB CATEGORIES APIs ***************/

// 1. Admin: Get All Sub Categories | GET /admin/get-all-sub-categories
export const adminGetAllSubCategories = async (page, size, search) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: '/admin/get-all-sub-categories',
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

/***************** CHILD CATEGORIES APIs ***************/

// 1. Admin: Get All Child Categories | GET /admin/get-all-child-categories
export const adminGetAllChildCategories = async (page, size, search) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: '/admin/get-all-child-categories',
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
