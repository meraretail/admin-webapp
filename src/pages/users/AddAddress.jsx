import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Importing components
import LoadingButton from '../../components/formComponents/LoadingButton';
import Button from '../../components/formComponents/Button';
import FormInput from '../../components/formComponents/FormInput';

// Importing icons and input fields
import { adminAddUserAddress } from '../../apis/users.apis';
import { addressInputs } from '../../listItems/userItems/userAddressInputs';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle from '../../components/common/PageTitle';

const AddAddress = () => {
  let { userId } = useParams();
  let navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  const [values, setValues] = useState({
    contactName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
  });

  const onValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await adminAddUserAddress(userId, values);
    setLoading(false);
    const { success, message } = response.data;
    setResSuccess(success);
    setResMessage(message);

    if (success) {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <div>
      {/* page header */}
      <PageTitle
        title={`Add new address for ${
          state.user.firstName ? state.user.firstName : ''
        } ${state.user.lastName ? state.user.lastName : ''}`}
        btnText='Go back to user details page'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[6rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* User Address update forms start */}
        <div className='shadow rounded border p-4 relative'>
          <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
            Enter address details to create new address
          </div>
          <form onSubmit={handleAddAddress} className='pt-2'>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                {addressInputs.map((input, index) => (
                  <FormInput
                    key={index}
                    {...input}
                    value={values[input.name]}
                    onChange={onValueChange}
                  />
                ))}
              </div>
              <div className='flex items-center'>
                {loading ? (
                  <LoadingButton
                    className='bg-violet-50 text-violet-700 border border-violet-700 
                hover:bg-violet-100'
                  />
                ) : (
                  <Button className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
                    Add new address
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
        {/* user address form ends */}
      </div>
    </div>
  );
};

export default AddAddress;
