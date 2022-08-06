import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';
import { showSimilarDetails } from '../../../apis/product.apis';
import { FaRegTimesCircle } from 'react-icons/fa';

const AddUpdateDetail = ({
  detailId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  editDetailVisible,
  setEditDetailVisible,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [name, setName] = useState('');
  const [demoAnswer, setDemoAnswer] = useState('');
  const [similarDetails, setSimilarDetails] = useState([]);

  // Step 1: If detailId exist, get detail
  useEffect(() => {
    let isMounted = true;
    const getDetailById = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'GET',
          url: `/api/product/admin/get-detail/${detailId}`,
        });
        // console.log('response', response);
        setLoading(false);
        isMounted && setName(response.data.detail.name);
        isMounted && setDemoAnswer(response.data.detail.demoAnswer);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    detailId && getDetailById();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setLoading, setResMessage, setResSuccess, detailId]);

  // Step 2: Search similar Details using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '') {
      setSimilarDetails([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarDetails(name);
      setSimilarDetails(response.data.details);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [name]);

  // Step 3.1: Add new detail
  const handleAddDetail = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: '/api/product/admin/create-detail',
        data: { name: name, demoAnswer: demoAnswer },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  // Step 3.2: Update feature
  const handleUpdateDetail = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'put',
        url: `/api/product/admin/update-detail/${detailId}`,
        data: { name: name, demoAnswer: demoAnswer },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setRerender(!rerender);
        setEditDetailVisible(!editDetailVisible);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  return (
    <ItemContainer title={detailId ? 'Update detail' : 'Add new detail'}>
      <div className='mt-2 relative'>
        {/* close button */}
        {editDetailVisible && (
          <div className='absolute -top-12 -right-2 bg-white z-20'>
            <button
              className='bg-transparent border-0 text-red-500 opacity-80 hover:opacity-70 p-2 rounded-full'
              onClick={() => setEditDetailVisible(!editDetailVisible)}
            >
              <FaRegTimesCircle className='scale-125' />
            </button>
          </div>
        )}
        <form
          onSubmit={detailId ? handleUpdateDetail : handleAddDetail}
          className='space-y-4'
        >
          <div className='grid md:grid-cols-2 gap-4 mt-2'>
            <FormInput
              label='Detail name'
              id='detail'
              type='text'
              placeholder='Enter detail name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              label='Demo answer'
              id='demoAnswer'
              type='text'
              placeholder='Enter demo answer'
              value={demoAnswer}
              onChange={(e) => setDemoAnswer(e.target.value)}
            />
          </div>

          {loading ? (
            <LoadingButton />
          ) : (
            <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 py-2'>
              {detailId ? 'Update detail' : 'Add detail'}
            </Button>
          )}
        </form>
      </div>
      <SimilarNames label='Similar detail names' array={similarDetails} />
    </ItemContainer>
  );
};

export default AddUpdateDetail;
