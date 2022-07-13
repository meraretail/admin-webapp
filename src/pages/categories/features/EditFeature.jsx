import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import FeatureOptionTable from '../../../components/categories/features/FeatureOptionTable';
import NewFeatOptForFeatId from '../../../components/categories/features/NewFeatOptForFeatId';
import UpdateFeatForm from '../../../components/categories/features/UpdateFeatForm';

const EditFeature = () => {
  const { id } = useParams();
  const [resStatus, setResStatus] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div className='p-6'>
      <PageTitle
        title='Edit Feature and its options'
        link='/features'
        btnText='Back to all features'
        type='negative'
      />
      {/* success / error message zone */}
      <SuccErrMsg
        resStatus={resStatus}
        resMessage={resMessage}
        showSuccess='true'
      />
      {/* success / error message zone ends */}
      {/* main content starts */}
      <div className='mt-6 space-y-8'>
        <UpdateFeatForm
          id={id}
          setResStatus={setResStatus}
          setResMessage={setResMessage}
        />
        <NewFeatOptForFeatId
          id={id}
          setResStatus={setResStatus}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
        <FeatureOptionTable
          id={id}
          setResStatus={setResStatus}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
      </div>
    </div>
  );
};

export default EditFeature;
