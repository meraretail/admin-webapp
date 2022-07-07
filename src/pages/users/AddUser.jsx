import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import Button from '../../components/formComponents/Button';
import FormInput from '../../components/formComponents/FormInput';
import LoadingButton from '../../components/formComponents/LoadingButton';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';

// Import icons and services
import { adminCreateUser, adminGetRolesFromDb } from '../../apis/users.apis';
import { createUserInputs } from '../../listItems/userItems/createUserInputs';

const AddUser = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [roles, setRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  let navigate = useNavigate();

  // Step 1: Get all roles from database
  useEffect(() => {
    adminGetRolesFromDb()
      .then((response) => {
        const dbRoles = response.data.roles;
        let tmpRoles = [];
        dbRoles.forEach((dbRole) => {
          tmpRoles.push(dbRole.roleName);
        });
        setAvailableRoles(tmpRoles);
      })
      .catch((error) => {
        setResMessage(error.data.message);
        setResSuccess(error.data.success);
      });
  }, [setResMessage, setResSuccess]);

  // Step 2: Handle text input changes
  const onValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Step 3: Handle checkbox changes
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      if (!roles.includes(e.target.value)) {
        setRoles([...roles, e.target.value]);
      }
    } else {
      var filteredRoles = roles.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      setRoles(filteredRoles);
    }
  };

  // Step 4: Call API to create new user
  const handleAddUser = async (event) => {
    event.preventDefault();

    let newValues;
    if (roles.length > 0) {
      newValues = { ...values, roles: roles };
    } else {
      newValues = values;
    }

    setLoading(true);
    const response = await adminCreateUser(newValues);
    // console.log(response);
    const { success, message } = response;
    setResSuccess(success);
    setResMessage(message);
    setLoading(false);

    if (success) {
      navigate('/users');
    }
  };

  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Add New User'
        btnText='Go to all users list'
        btnLink='/users'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[6rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg resMessage={resMessage} resSuccess={resSuccess} />
        {/* success / error message zone ends */}
        {/* User information update forms start */}
        <div className='shadow rounded border p-4 relative'>
          <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
            Enter user details and password to create new user
          </div>
          <form onSubmit={handleAddUser} className='pt-2'>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                {createUserInputs.map((input, index) => (
                  <FormInput
                    key={index}
                    {...input}
                    value={values[input.name]}
                    onChange={onValueChange}
                  />
                ))}
              </div>
              {/* checkbox items */}
              <div>
                <div className='mb-2 pb-1 border-b text-sm'>
                  Choose user roles:
                </div>
                <ul className='flex items-center gap-4'>
                  {availableRoles.map((role, index) => (
                    <li key={index}>
                      <input
                        type='checkbox'
                        id={role}
                        name='roles'
                        value={role}
                        onChange={handleCheckboxChange}
                        className='mr-2 cursor-pointer'
                      />
                      <label htmlFor={role} className='text-sm cursor-pointer'>
                        {role}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* checkbox items end */}
              <div className='flex items-center'>
                {loading ? (
                  <LoadingButton
                    className='bg-violet-50 text-violet-700 border border-violet-700 
                hover:bg-violet-100'
                  />
                ) : (
                  <Button className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
                    Create User
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
