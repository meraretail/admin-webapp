import React, { useState } from 'react';
import PageTitle from '../../components/common/PageTitle';
import { MdOutlineAddChart } from 'react-icons/md';
import VariationTable from '../../components/variations/VariationTable';
import SuccErrMsg from '../../components/common/SuccErrMsg';

const Variations = () => {
  const [resStatus, setResStatus] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div className='p-6'>
      <PageTitle
        title='Variations'
        link='/variation/new'
        btnIcon={<MdOutlineAddChart />}
        btnText='Add new variation'
        type='positive'
      />
      {/* success / error message zone */}
      <SuccErrMsg resStatus={resStatus} resMessage={resMessage} />
      {/* success / error message zone ends */}
      {/* main content starts */}
      <div className='mt-6 space-y-8'>
        <VariationTable
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

export default Variations;
