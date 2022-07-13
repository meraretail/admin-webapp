import { axiosPdInstance } from './axios.config';

// ADMIN ONLY
// 1.1 POST '/admin/show-similar-details' - get list of similar details
export const showSimilarDetails = async (name) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/show-similar-details',
      data: { name: name },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN ONLY
// 1.2 POST /admin/create-detail - admin can add new detail
export const adminCreateDetail = async (name, demoAnswer) => {
  try {
    const response = await axiosPdInstance({
      method: 'post',
      url: '/admin/create-detail',
      data: { name: name, demoAnswer: demoAnswer },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN OR SELLER
// 1.3 GET /list-all-details - get all details list
export const listAllDetails = async () => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/list-all-details',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ADMIN
// 1.4 GET /admin/all-details-summary - admin get summary of all details
export const adminAllDetailsSummary = async (page, size, search) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: '/admin/all-details-summary',
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
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/detail/${detailId}`,
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
    const response = await axiosPdInstance({
      method: 'put',
      url: `/admin/update-detail/${detailId}`,
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
    const response = await axiosPdInstance({
      method: 'delete',
      url: `/admin/delete-detail/${detailId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
