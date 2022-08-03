import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Importing image assets
import heroLogin from '../assets/hero-login.png';
import logo from '../assets/logo.png';
import Button from '../components/formComponents/Button';
import FormInput from '../components/formComponents/FormInput';
import LoadingButton from '../components/formComponents/LoadingButton';
import SuccErrMsg from '../components/common/SuccErrMsg';
import { loginUser } from '../apis/auth.apis';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { setAuth, persist, setPersist } = useAuth();

  // set persist state in localstorage
  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : '/';

  // API response states
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    if (values.email === '' || values.password === '') {
      setResSuccess(false);
      setResMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    const response = await loginUser(values);
    setLoading(false);
    const { user, accessToken, roles, success, message } = response.data;
    setResSuccess(success);
    setResMessage(message);
    if (success) {
      setAuth({
        user,
        accessToken,
        roles,
      });
      navigate(from, { replace: true });
    }
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

            {/* button and trust device section */}
            <div className='space-y-2'>
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

              {/* Trust this device check box */}
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='persist'
                  className='h-4 w-4'
                  checked={persist}
                  onChange={() => setPersist(!persist)}
                />
                <label
                  htmlFor='persist'
                  className='ml-2 text-sm text-violet-700'
                >
                  Trust this device
                </label>
              </div>
            </div>
          </form>
          {/* login form ends */}
          {/* success / error message zone */}
          <div className='pt-2'>
            <SuccErrMsg
              resMessage={resMessage}
              resSuccess={resSuccess}
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
