import { useState, useEffect } from 'react';
import PageTitle from '../../../components/common/PageTitle';
import SuccErrMsg from '../../../components/common/SuccErrMsg';
import ItemContainer from '../../../components/common/ItemContainer';
import FormInput from '../../../components/formComponents/FormInput';
import Button from '../../../components/formComponents/Button';
import LoadingButton from '../../../components/formComponents/LoadingButton';
import SimilarNames from '../../../components/common/SimilarNames';
import {
  showSimilarDetails,
  adminCreateDetail,
} from '../../../apis/details.apis';

const AddDetail = () => {
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [demoAnswer, setDemoAnswer] = useState('');
  const [similarDetails, setSimilarDetails] = useState([]);

  // Step 1: Search similar Details using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '') {
      setSimilarDetails([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarDetails(name);
      setSimilarDetails(response.data.Details);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [name]);

  // Step 2: Add new Detail
  const handleAddDetail = async (event) => {
    event.preventDefault();
    if (name === '' || demoAnswer === '') {
      setResSuccess(false);
      setResMessage('Please fill all the fields');
      return;
    }
    setLoading(true);
    const { data } = await adminCreateDetail(name, demoAnswer);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    if (data.success) {
      setName('');
      setDemoAnswer('');
    }
  };

  return (
    <div>
      <PageTitle
        title='Add new detail'
        link='/details'
        btnText='Back to all details'
        type='negative'
      />
      <div className='px-4 mt-[5.5rem] mb-10 space-y-6'>
        {/* success / error message zone */}
        <SuccErrMsg
          resSuccess={resSuccess}
          resMessage={resMessage}
          showSuccess='true'
        />
        {/* success / error message zone ends */}
        {/* main content starts */}
        <div className='mt-6 space-y-8'>
          <ItemContainer title='New detail name'>
            <form
              onSubmit={handleAddDetail}
              className='grid md:grid-cols-2 gap-4 mt-2'
            >
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
              {loading ? (
                <LoadingButton />
              ) : (
                <Button
                  text='Create new detail'
                  className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
                />
              )}
            </form>
            <SimilarNames label='Similar detail names' array={similarDetails} />
          </ItemContainer>
        </div>
      </div>
    </div>
  );
};

export default AddDetail;
