import { axiosClient } from '../apis/axios-client';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axiosClient({
        method: 'get',
        url: '/api/identity/logout',
      });
    } catch (error) {
      console.log(`Unable to logout: ${error}`);
    }
  };
  return logout;
};

export default useLogout;
