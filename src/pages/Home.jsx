import React from 'react';
import { Outlet } from 'react-router-dom';

// Importing Components
import Sidebar from '../components/common/Sidebar';

const Home = () => {
  // console.log('check re render');
  return (
    <div className='flex items-start'>
      <Sidebar className='fixed top-0 left-0 bottom-0 w-[12rem] h-screen' />
      <div className='ml-[12rem] overflow-auto flex-grow'>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
