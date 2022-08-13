import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '../formComponents/Button';
import LoadingButton from '../formComponents/LoadingButton';
import { adminUpdateUserRolesById } from '../../apis/users.apis';

const EditRole = ({ user, setResSuccess, setResMessage }) => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

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

  useEffect(() => {
    const rolesArray = [];
    user.roles.map((item) => rolesArray.push(item.roleName));
    // console.log(rolesArray);
    setRoles(rolesArray);
  }, [user]);

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

  const handleUpdateRoles = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await adminUpdateUserRolesById(user.id, roles);
    setLoading(false);
    const { success, message } = response.data;
    setResMessage(message);
    setResSuccess(success);
  };

  // checkbox items
  // console.log(roles);
  return (
    <div className='shadow rounded border p-4 relative'>
      <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
        Role information
      </div>
      <form onSubmit={handleUpdateRoles} className='pt-2'>
        <ul className='flex items-end gap-4'>
          {availableRoles.map((role, index) => (
            <li key={index}>
              <input
                type='checkbox'
                checked={roles.includes(role)}
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
        <div className='flex items-center mt-4'>
          {loading ? (
            <LoadingButton
              className='bg-violet-50 text-violet-700 border border-violet-700 
                hover:bg-violet-100'
            />
          ) : (
            <Button className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
              Update user roles
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditRole;
