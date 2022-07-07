import { axiosInstance } from './axios.config';

// 1. Admin: Get All Users | GET /admin/get-all-users
export const adminGetAllUsers = async (page, size, search) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: '/admin/get-all-users',
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

// 2. Admin: Get User by Id | GET /admin/get-user/:id
export const adminGetUserById = async (id) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/admin/get-user/${id}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 3. Admin: Delete User by Id | DELETE /admin/delete-user/:id
export const adminDeleteUserById = async (id) => {
  try {
    const response = await axiosInstance({
      method: 'delete',
      url: `/admin/delete-user/${id}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 4. Admin: Create new user | POST /admin/create-user
export const adminCreateUser = async (values) => {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: '/admin/create-user',
      data: values,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 5 Admin: Get available roles from db | GET /admin/get-roles-from-db
export const adminGetRolesFromDb = async () => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: '/admin/get-roles-from-db',
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/*********** User Address Routes *************/

// 1. Admin: Add new address | POST /user/:id/add-address
export const adminAddUserAddress = async (id, address) => {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/user/${id}/add-address`,
      data: address,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 2. Admin: Mark address as default | POST /user/:id/:addressId/make-default
export const adminMakeAddressDefault = async (id, addressId) => {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/user/${id}/${addressId}/make-default`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 3. Admin: Delete address | DELETE /user/:id/:addressId
export const adminDeleteUserAddress = async (id, addressId) => {
  try {
    const response = await axiosInstance({
      method: 'delete',
      url: `/user/${id}/${addressId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 4. Admin: Update address | PUT /user/:id/:addressId
export const adminUpdateUserAddress = async (id, addressId, address) => {
  try {
    const response = await axiosInstance({
      method: 'put',
      url: `/user/${id}/${addressId}`,
      data: address,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/*********** Update User Routes *************/

// 1. Admin: Update User profile by Id | PUT /admin/update-user/:id/profile
export const adminUpdateUserProfileById = async (id, user) => {
  try {
    const response = await axiosInstance({
      method: 'put',
      url: `/admin/update-user/${id}/profile`,
      data: user,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 2. Admin: Update User password by Id | PUT /admin/update-user/:id/password
export const adminUpdateUserPasswordById = async (id, user) => {
  try {
    const response = await axiosInstance({
      method: 'put',
      url: `/admin/update-user/${id}/password`,
      data: user,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 3. Admin: Update User roles by Id | PUT /admin/update-user/:id/roles
export const adminUpdateUserRolesById = async (id, user) => {
  try {
    const response = await axiosInstance({
      method: 'put',
      url: `/admin/update-user/${id}/roles`,
      data: user,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
