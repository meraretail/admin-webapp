import React, { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import VariationTable from '../../../components/categories/variations/VariationTable';
import { MdOutlineAddChart } from 'react-icons/md';
import MainContainer from '../../../components/common/MainContainer';

const Variations = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <PageTitle
        title='Variations'
        btnLink='/variation/new'
        btnIcon={<MdOutlineAddChart />}
        btnText='Add new variation'
        type='positive'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <VariationTable
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />
        </div>
        {/* main content ends */}
      </MainContainer>
    </div>
  );
};

export default Variations;
