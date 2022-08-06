import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/common/PageTitle';
import MainContainer from '../../../components/common/MainContainer';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import VarOptionTable from '../../../components/categories/variations/VarOptionTable';
import AddUpdateVariation from '../../../components/categories/variations/AddUpdateVariation';
import AddUpdateVariationOption from '../../../components/categories/variations/AddUpdateVariationOption';

const EditVariation = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);
  const [editVarOptVisible, setEditVarOptVisible] = useState(false);
  const [varOptionId, setVarOptionId] = useState({});

  const handleEditVariationOption = (varOptId) => {
    setEditVarOptVisible(true);
    setVarOptionId(varOptId);
  };

  return (
    <div>
      <PageTitle
        title='Edit variation and its options'
        link='/variations'
        btnText='Back to all variations'
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
        <div className='mt-6 pb-12 space-y-8'>
          <AddUpdateVariation
            variationId={id}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />
          <AddUpdateVariationOption
            variationId={id}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />
          <VarOptionTable
            variationId={id}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
            handleEditVariationOption={handleEditVariationOption}
          />

          {editVarOptVisible && (
            <AddUpdateVariationOption
              variationId={id}
              varOptionId={varOptionId}
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
              rerender={rerender}
              setRerender={setRerender}
              editVarOptVisible={editVarOptVisible}
              setEditVarOptVisible={setEditVarOptVisible}
            />
          )}
        </div>
      </MainContainer>
    </div>
  );
};

export default EditVariation;
