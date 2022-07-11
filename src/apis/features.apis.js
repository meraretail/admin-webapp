import { axiosPdInstance } from './axios.config';

// ADMIN OR SELLER
// 3.3 GET /list-all-features - get all features list
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
