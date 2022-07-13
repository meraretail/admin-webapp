import React, { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import DetailsTable from '../../../components/categories/details/DetailsTable';
import { MdPostAdd } from 'react-icons/md';
import MainContainer from '../../../components/common/MainContainer';

const Details = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <PageTitle
        title='Details'
        btnLink='/detail/new'
        btnIcon={<MdPostAdd />}
        btnText='Add new detail'
        type='positive'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <DetailsTable
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

export default Details;
