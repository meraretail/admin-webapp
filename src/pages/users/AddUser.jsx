import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '../../components/formComponents/Button';
import FormInput from '../../components/formComponents/FormInput';
import LoadingButton from '../../components/formComponents/LoadingButton';
import PageTitle from '../../components/common/PageTitle';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ItemContainer from '../../components/common/ItemContainer';
import MainContainer from '../../components/common/MainContainer';
import { createUserInputs } from '../../listItems/userItems/createUserInputs';

const AddUser = () => {
  const axiosPrivate = useAxiosPrivate();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [roles, setRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  let navigate = useNavigate();

  // Step 1: Get all roles from database
  useEffect(() => {
    let isMounted = true;
    const getAllRoles = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'get',
          url: '/api/identity/admin/get-roles-from-db',
        });
        setLoading(false);
        const dbRoles = response.data.roles;
        let tmpRoles = [];
        dbRoles.forEach((dbRole) => {
          tmpRoles.push(dbRole.roleName);
        });
        isMounted && setAvailableRoles(tmpRoles);
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    getAllRoles();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setResMessage, setResSuccess]);

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
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: '/api/identity/admin/create-user',
        data: newValues,
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        navigate('/users');
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
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
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg resMessage={resMessage} resSuccess={resSuccess} />
        {/* success / error message zone ends */}
        {/* User information update forms start */}

        <ItemContainer title='Enter user details and password to create new user'>
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
        </ItemContainer>
      </MainContainer>
    </div>
  );
};

export default AddUser;
