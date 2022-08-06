import { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import FeatureTable from '../../../components/categories/features/FeatureTable';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import MainContainer from '../../../components/common/MainContainer';
import AddUpdateFeature from '../../../components/categories/features/AddUpdateFeature';
import ItemContainer from '../../../components/common/ItemContainer';

const Features = () => {
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <PageTitle
        title='Features'
        btnText='Back to previous page'
        type='negative'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <AddUpdateFeature
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />

          <ItemContainer title='All Features summary'>
            <FeatureTable
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

export default Features;
