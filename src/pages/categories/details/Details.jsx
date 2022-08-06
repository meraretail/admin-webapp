import { useState, useEffect } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import DetailsTable from '../../../components/categories/details/DetailsTable';
import { MdPostAdd } from 'react-icons/md';
import MainContainer from '../../../components/common/MainContainer';
import AddUpdateDetail from '../../../components/categories/details/AddUpdateDetail';
import ItemContainer from '../../../components/common/ItemContainer';

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  const [editDetailVisible, setEditDetailVisible] = useState(false);
  const [detailId, setDetailId] = useState('');

  // Step 0. Scroll to bottom of page smoothly on page load
  useEffect(() => {
    if (editDetailVisible) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [editDetailVisible]);

  const handleEditDetail = (detailId) => {
    setDetailId(detailId);
    setEditDetailVisible(true);
  };

  return (
    <div>
      <PageTitle
        title='Details'
        btnText='Back to previous page'
        type='negative'
      />
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <AddUpdateDetail
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
            setRerender={setRerender}
          />
          <ItemContainer title='All details summary'>
            <DetailsTable
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
              rerender={rerender}
              setRerender={setRerender}
              handleEditDetail={handleEditDetail}
            />
          </ItemContainer>

          {editDetailVisible && (
            <AddUpdateDetail
              detailId={detailId}
              loading={loading}
              setLoading={setLoading}
              setResSuccess={setResSuccess}
              setResMessage={setResMessage}
              rerender={rerender}
              setRerender={setRerender}
              editDetailVisible={editDetailVisible}
              setEditDetailVisible={setEditDetailVisible}
            />
          )}
        </div>
        {/* main content ends */}
      </MainContainer>
    </div>
  );
};

export default Details;
