import React, { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import MainContainer from '../../../components/common/MainContainer';
import VariationTable from '../../../components/categories/variations/VariationTable';
import AddUpdateVariation from '../../../components/categories/variations/AddUpdateVariation';
import ItemContainer from '../../../components/common/ItemContainer';

const Variations = () => {
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <PageTitle
        title='Variations'
        btnText='Back to previous page'
        type='negative'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <AddUpdateVariation
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />

          <ItemContainer title='All Variations summary'>
            <VariationTable
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
              rerender={rerender}
              setRerender={setRerender}
            />
          </ItemContainer>
        </div>
        {/* main content ends */}
      </MainContainer>
    </div>
  );
};

export default Variations;
