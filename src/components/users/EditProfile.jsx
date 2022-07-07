import { useEffect, useState } from 'react';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';

// Importing icons & services
import { adminUpdateUserProfileById } from '../../apis/users.apis';
import { editUserProfileInputs } from '../../listItems/userItems/editUserInputs';

const EditProfile = ({ user, setResSuccess, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });
  }, [user]);

  const onValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await adminUpdateUserProfileById(user.id, values);
    setLoading(false);
    // console.log(response);
    const { success, message } = response.data;
    setResSuccess(success);
    setResMessage(message);
  };

  return (
    <div className='shadow rounded border p-4 relative'>
      <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
        Basic profile information
      </div>

      <form onSubmit={handleSubmitProfile} className='pt-2'>
        <div className='space-y-4 md:space-y-6'>
          {editUserProfileInputs.map((input, index) => (
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
                Update profile details
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
