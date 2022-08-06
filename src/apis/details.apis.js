import { axiosClient } from './axios-client';

// ADMIN ONLY
// 1.2 POST /admin/create-detail - admin can add new detail
export const adminCreateDetail = async (name, demoAnswer) => {
  try {
    const response = await axiosClient({
      method: 'post',
      url: '/api/product/admin/create-detail',
      data: { name: name, demoAnswer: demoAnswer },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER

// ADMIN
// 1.4 GET /admin/all-details-summary - admin get summary of all details
export const adminAllDetailsSummary = async (page, size, search) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: '/api/product/admin/all-details-summary',
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
// 1.5 GET '/admin/detail/:detailId' - get detail by Id
export const adminGetDetailById = async (detailId) => {
  try {
    const response = await axiosClient({
      method: 'get',
      url: `/api/product/admin/detail/${detailId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.6 PUT '/admin/update-detail/:detailId' - Update Detail by Id
export const adminUpdateDetailById = async (detailId, name, demoAnswer) => {
  try {
    const response = await axiosClient({
      method: 'put',
      url: `/api/product/admin/update-detail/${detailId}`,
      data: { name: name, demoAnswer: demoAnswer },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.7 DELETE '/admin/delete-detail/:detailId' - Delete Detail by Id
export const adminDeleteDetailById = async (detailId) => {
  try {
    const response = await axiosClient({
      method: 'delete',
      url: `/api/product/admin/delete-detail/${detailId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
