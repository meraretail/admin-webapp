import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// redux imports
import { useDispatch, useSelector } from 'react-redux';
import { login, reset, errorFn } from '../redux/slices/auth.slice';
import { refreshTokens } from '../redux/slices/auth.slice';

// Importing image assets
import heroLogin from '../assets/hero-login.png';
import logo from '../assets/logo.png';
import Button from '../components/formComponents/Button';
import FormInput from '../components/formComponents/FormInput';
import LoadingButton from '../components/formComponents/LoadingButton';
import SuccErrMsg from '../components/common/SuccErrMsg';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : '/';

  const { loading, isAuthenticated, success, message, roles } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (from && !(from === '/' || from === '/login')) {
      dispatch(refreshTokens());
      dispatch(reset());
    }
  }, [dispatch, from]);

  useEffect(() => {
    if (isAuthenticated) {
      if (roles.find((role) => role === process.env.REACT_APP_ROLE)) {
        navigate(from, { replace: true });
      } else {
        dispatch(
          errorFn({
            success: false,
            message: 'You are not authorized to access this page!',
          })
        );
      }
    }
  }, [dispatch, from, isAuthenticated, navigate, roles]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (values.email === '' || values.password === '') {
      dispatch(
        errorFn({
          success: false,
          message: 'Please enter your email and password to login!',
        })
      );
      return;
    }
    dispatch(login(values));
    dispatch(reset());
  };

  const onValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex min-h-screen'>
      {/* left section */}
      <div className='w-1/2 bg-cover bg-login-bg px-10 py-5 hidden md:flex flex-col items-center justify-center'>
        <img src={heroLogin} alt='hero-login' className='w-3/4' />
        <div className='text-center mt-10 space-y-2'>
          <h1 className='text-2xl font-bold'>Grow Business</h1>
          <p>
            MeraRetail is one of a kind platform to own and promote your digital
            identity to prospective customers
          </p>
        </div>
      </div>
      {/* left section ends */}
      {/* right section */}
      <div className='w-full lg:w-1/2 bg-gradient-to-t from-violet-100 to-violet-50 lg:from-white lg:to-white px-10 py-5 flex flex-col justify-between'>
        {/* logo */}
        <header className='flex items-center justify-end gap-2'>
          <img src={logo} alt='logo' className='w-8 h-8' />
          <h1 className='font-bold text-2xl mb-0 text-purple-600 font-inter tracking-tight'>
            meraRetail
          </h1>
        </header>
        {/* logo ends */}
        {/* login form */}
        <div className='text-center'>
          <div className='space-y-2 mb-10'>
            <h1 className='text-2xl font-bold'>Hi, Please login</h1>
            <p className='tracking-wider font-manrope text-violet-700'>
              Login to meraretail admin portal
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className='bg-white border rounded shadow p-8 space-y-8'
          >
            <FormInput
              name='email'
              label='Email'
              type='email'
              placeholder='Enter your email'
              value={values.email}
              onChange={onValueChange}
              className='h-12'
            />

            <FormInput
              name='password'
              label='Password'
              type='password'
              placeholder='Enter your password'
              value={values.password}
              onChange={onValueChange}
              className='h-12'
            />

            <div className='flex items-center'>
              {loading ? (
                <LoadingButton
                  className='bg-violet-50 text-violet-700 border border-violet-700 
                            hover:bg-violet-100 py-2'
                />
              ) : (
                <Button className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 py-2'>
                  Login
                </Button>
              )}
            </div>
          </form>
          {/* login form ends */}
          {/* success / error message zone */}
          <div className='pt-2'>
            <SuccErrMsg
              resMessage={message}
              resSuccess={success}
              showSuccess={true}
            />
          </div>
          {/* success / error message zone ends */}
        </div>
        {/* login form ends */}
        {/* footer */}
        <footer className='flex items-center justify-between text-xs text-gray-400'>
          <span>© 2021 MeraRetail. All rights reserved.</span>
          <span>Terms of service | Privacy policy</span>
        </footer>
        {/* footer ends */}
      </div>
    </div>
  );
};

export default Login;
