import React, { useState } from 'react';
import { editPasswordInputs } from '../../listItems/userItems/editUserInputs';
import { adminUpdateUserPasswordById } from '../../apis/users.apis';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';

const EditPassword = ({ user, onStatus, onMessage }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const onValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (values.password !== values.confirmPassword) {
      onStatus('Password does not match');
      onMessage('Password and confirm password do not match');
      setLoading(false);
      return;
    }

    const response = await adminUpdateUserPasswordById(
      user.id,
      values.password
    );
    // console.log(response);
    const { data, statusText } = response;
    onStatus(statusText);
    onMessage(data.message);

    setLoading(false);
  };

  return (
    <div className='shadow rounded border p-4 relative'>
      <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
        Password Change
      </div>
      <form onSubmit={handleUpdatePassword} className='pt-2'>
        <div className='space-y-4'>
          {editPasswordInputs.map((input, index) => (
            <FormInput
              key={index}
              {...input}
              value={values[input.name]}
              onChange={onValueChange}
            />
          ))}

          <div className='flex items-center'>
            {loading ? (
              <LoadingButton
                className='bg-violet-50 text-violet-700 border border-violet-700 
                hover:bg-violet-100'
              />
            ) : (
              <Button className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
                Update password
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
