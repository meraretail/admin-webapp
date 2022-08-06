import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import FeatureOptionTable from '../../../components/categories/features/FeatureOptionTable';
import AddUpdateFeature from '../../../components/categories/features/AddUpdateFeature';
import AddUpdateFeatureOption from '../../../components/categories/features/AddUpdateFeatureOption';
import MainContainer from '../../../components/common/MainContainer';

const EditFeature = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);
  const [editFeatOptVisible, setEditFeatOptVisible] = useState(false);
  const [featOptionId, setFeatOptionId] = useState({});

  const handleEditFeatureOption = (featOptId) => {
    setEditFeatOptVisible(true);
    setFeatOptionId(featOptId);
  };

  return (
    <div>
      <PageTitle
        title='Edit Feature and its options'
        link='/features'
        btnText='Back to all features'
        type='negative'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg
          resSuccess={resSuccess}
          resMessage={resMessage}
          showSuccess='true'
        />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <AddUpdateFeature
            featureId={id}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />
          <AddUpdateFeatureOption
            featureId={id}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />

          <FeatureOptionTable
            featureId={id}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
            handleEditFeatureOption={handleEditFeatureOption}
          />

          {editFeatOptVisible && (
            <AddUpdateFeatureOption
              featureId={id}
              featOptionId={featOptionId}
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
              rerender={rerender}
              setRerender={setRerender}
              editFeatOptVisible={editFeatOptVisible}
              setEditFeatOptVisible={setEditFeatOptVisible}
            />
          )}
        </div>
      </MainContainer>
    </div>
  );
};

export default EditFeature;
