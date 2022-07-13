import { useState } from 'react';
import { MdOutlineAddChart } from 'react-icons/md';
import PageTitle from '../../../components/common/PageTitle';
import FeatureTable from '../../../components/categories/features/FeatureTable';
import SuccErrMsg from '../../../components/common/SuccErrMsg';

const Features = () => {
  const [resStatus, setResStatus] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div className='p-6'>
      <PageTitle
        title='Features'
        link='/feature/new'
        btnIcon={<MdOutlineAddChart />}
        btnText='Add new feature'
        type='positive'
      />
      {/* success / error message zone */}
      <SuccErrMsg resStatus={resStatus} resMessage={resMessage} />
      {/* success / error message zone ends */}
      {/* main content starts */}
      <div className='mt-6 space-y-8'>
        <FeatureTable
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

export default Features;
