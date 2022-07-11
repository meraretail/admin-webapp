import { axiosPdInstance } from './axios.config';

// ADMIN
// 1.4 GET /admin/all-categories-summary - admin can summary at category level
export const adminAllProductsSummary = async (
  page,
  size,
  search,
  childCategoryId
) => {
  try {
    const response = await axiosPdInstance({
      method: 'get',
      url: `/admin/all-products-summary/${childCategoryId}`,
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
