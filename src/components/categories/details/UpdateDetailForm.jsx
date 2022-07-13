import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemContainer from '../../common/ItemContainer';
import SimilarNames from '../../common/SimilarNames';
import Button from '../../formComponents/Button';
import FormInput from '../../formComponents/FormInput';
import LoadingButton from '../../formComponents/LoadingButton';

import {
  showSimilarDetails,
  adminGetDetailById,
  adminUpdateDetailById,
} from '../../../apis/details.apis';

const UpdateDetailForm = ({ id, setResStatus, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [orgDetail, setOrgDetail] = useState({}); // original values
  const [name, setName] = useState('');
  const [demoAnswer, setDemoAnswer] = useState('');
  const [similarDetails, setSimilarDetails] = useState([]);

  const navigate = useNavigate();

  // Step 1: fetch Detail data
  useEffect(() => {
    setLoading(true);
    adminGetDetailById(id)
      .then((res) => {
        setOrgDetail(res.data.detail);
        setName(res.data.detail.name);
        setDemoAnswer(res.data.detail.demoAnswer);
      })
      .catch((err) => {
        setResStatus(err.data.statusText);
        setResMessage(err.data.message);
      });
    setLoading(false);
  }, [id, setResMessage, setResStatus]);

  // Step 2: Search similar Details using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '' || name === orgDetail.name) {
      setSimilarDetails([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarDetails(name);
      setSimilarDetails(response.data.details);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [orgDetail, name]);

  // Step 3: Edit Detail
  const handleEditDetail = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await adminUpdateDetailById(id, name, demoAnswer);
    const { data, statusText } = response;
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);

    if (statusText === 'OK') {
      setName('');
      setDemoAnswer('');
      navigate('/details');
    }
  };

  return (
    <ItemContainer title='Update detail name'>
      <form
        onSubmit={handleEditDetail}
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
            text='Update detail'
            className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'
          />
        )}
      </form>
      <SimilarNames label='Similar detail names' array={similarDetails} />
    </ItemContainer>
  );
};

export default UpdateDetailForm;
