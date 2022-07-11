import { axiosPdInstance } from './axios.config';

// ADMIN OR SELLER
// 3.3 GET /list-all-features - get all features list
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
