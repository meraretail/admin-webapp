import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// Importing components
import LoadingButton from '../../components/formComponents/LoadingButton';
import Button from '../../components/formComponents/Button';
import FormInput from '../../components/formComponents/FormInput';

// Importing Icons & services
import { addressInputs } from '../../listItems/userItems/userAddressInputs';
import { adminUpdateUserAddress } from '../../apis/users.apis';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle from '../../components/common/PageTitle';

const EditAddress = () => {
  const { userId, addressId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

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
    phoneNumber: '',
  });

  useEffect(() => {
    setValues({
      contactName: state.address.contactName,
      street1: state.address.street1,
      street2: state.address.street2,
      city: state.address.city,
      state: state.address.state,
      pincode: state.address.pincode,
      country: state.address.country,
      phoneNumber: state.address.phoneNumber,
    });
  }, [state]);

  const onValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleEditAddress = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await adminUpdateUserAddress(userId, addressId, values);
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
        title='Edit user address'
        btnText='Go back to user details page'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5.5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resSuccess={resSuccess} resMessage={resMessage} />
        {/* success / error message zone ends */}
        {/* User Address update forms start */}
        <div className='shadow rounded border mt-6 p-4 relative'>
          <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
            Update address details
          </div>
          <form onSubmit={handleEditAddress} className='pt-2'>
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
                    Update address
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

export default EditAddress;
