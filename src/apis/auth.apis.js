import { axiosIdInstance } from './axios.config';

// no try catch block - error handled by redux thunk

// 5. ADMIN login route | POST /api/identity/admin/login
export const loginUser = async ({ email, phone, password }) => {
  const response = await axiosIdInstance({
    method: 'post',
    url: '/admin/login',
    data: {
      email: email,
      phone: phone,
      password: password,
    },
  });
  return response;
};

// 7. Refresh Auth tokens | POST /api/identity/refresh-tokens
export const refreshAccessAndRefreshTokens = async () => {
  const response = await axiosIdInstance({
    method: 'post',
    url: '/refresh-tokens',
  });
  return response;
};

// 8. Logout route | POST /api/identity/logout
export const logoutUser = async () => {
  const response = await axiosIdInstance({
    method: 'post',
    url: '/logout',
  });
  return response;
};
