import { Link } from 'react-router-dom';
import SideBar from '../components/common/SideBar';

const NotFound = () => {
  return (
    <div className='flex items-start'>
      <SideBar className='fixed top-0 left-0 w-[12rem] h-screen' />
      <div className='ml-[12rem] overflow-auto flex-grow flex flex-col justify-center items-center h-screen'>
        <h1 className='text-5xl text-center'>404</h1>
        <h2 className='text-2xl text-center'>Page not found</h2>
        <Link to='/'>
          <h3 className='text-xl text-center text-red-500 hover:underline'>
            Click to go to home page
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
