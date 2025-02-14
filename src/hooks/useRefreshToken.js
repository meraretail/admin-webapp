import { axiosClient } from '../apis/axios-client';
import useAuth from './useAuth';

/********** FUNCTION OF USE REFRESH TOKEN **********/
// refresh function will refresh refreshToken in cookie
// will set the new access token in the state and will return the new access token

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosClient({
      method: 'get',
      url: '/api/identity/refresh-tokens',
    });
    // console.log('response', response);
    const { user, roles, stores, accessToken } = response.data;
    setAuth({ user, roles, stores, accessToken });
    // return accessToken for use in axiosClient
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
