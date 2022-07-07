import React, { useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import UsersTable from '../../components/users/UsersTable';

const Users = () => {
  const [resSuccess, setResSuccess] = useState('');
  const [resMessage, setResMessage] = useState('');

  return (
    <div>
      <PageTitle
        title='Users'
        btnText='Add new user'
        btnIcon={<MdLibraryAdd />}
        btnLink='/user/new'
        type='positive'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resMessage={resMessage} resSuccess={resSuccess} />
        {/* Users table goes here */}
        <UsersTable
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
        />
      </div>
    </div>
  );
};

export default Users;
