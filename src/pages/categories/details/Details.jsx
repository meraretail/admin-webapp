import React, { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import DetailsTable from '../../../components/categories/details/DetailsTable';
import { MdPostAdd } from 'react-icons/md';

const Details = () => {
  const [resStatus, setResStatus] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div className='p-6'>
      <PageTitle
        title='Details'
        link='/detail/new'
        btnIcon={<MdPostAdd />}
        btnText='Add new detail'
        type='positive'
      />
      {/* success / error message zone */}
      <SuccErrMsg resStatus={resStatus} resMessage={resMessage} />
      {/* success / error message zone ends */}
      {/* main content starts */}
      <div className='mt-6 space-y-8'>
        <DetailsTable
          setResStatus={setResStatus}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
      </div>
      {/* main content ends */}
    </div>
  );
};

export default Details;
