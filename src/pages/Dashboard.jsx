import React, { useState, useEffect } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import PageTitle from '../components/common/PageTitle';
import SuccErrMsg from '../components/common/SuccErrMsg';

const Dashboard = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  useEffect(() => {
    setResSuccess(true);
    setResMessage('');
  }, []);

  return (
    <div>
      <PageTitle
        title='Dashboard'
        btnText='Add new widgets'
        btnIcon={<MdLibraryAdd />}
        btnLink='/product/new'
        type='positive'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resMessage={resMessage} resSuccess={resSuccess} />
        Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
