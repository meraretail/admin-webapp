import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';
import PanelLayoutSkeleton from './PanelLayoutSkeleton';

function PersistLogin() {
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  // Run below useEffect only once when component loads
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh(); // refresh() sets new accessToken in memory and new refreshToken in cookie
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    // if accessToken is null and persist is true, then run verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect to check what's happening
  // useEffect(() => {
  //   console.log('isLoading:', isLoading);
  //   console.log('accessToken:', JSON.stringify(auth?.accessToken));
  // }, [isLoading]);

  // if persist is not true, then useRefreshToken will not be called
  // RequireAuth will directly land user on login page if accessToken expired
  return (
    <>
      {!persist ? <Outlet /> : isLoading ? <PanelLayoutSkeleton /> : <Outlet />}
    </>
  );
}

export default PersistLogin;
