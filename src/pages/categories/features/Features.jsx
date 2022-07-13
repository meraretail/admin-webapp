import { useState } from 'react';
import { MdOutlineAddChart } from 'react-icons/md';
import PageTitle from '../../../components/common/PageTitle';
import FeatureTable from '../../../components/categories/features/FeatureTable';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import MainContainer from '../../../components/common/MainContainer';

const Features = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <PageTitle
        title='Features'
        btnLink='/feature/new'
        btnIcon={<MdOutlineAddChart />}
        btnText='Add new feature'
        type='positive'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <FeatureTable
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

export default Features;
