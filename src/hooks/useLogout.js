import { logoutUser } from '../apis/auth.apis';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
