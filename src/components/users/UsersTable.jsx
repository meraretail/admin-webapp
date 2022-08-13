import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import LoadSpinner from '../common/LoadSpinner';
import SearchNDateOptions from '../tableComponents/SearchNDateOptions';
import PopularFilters from '../tableComponents/PopularFilters';
import SizePageOptions from '../tableComponents/SizePageOptions';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs';
import { userPopularFilters } from '../../listItems/userItems/userTableItems';

const UsersTable = ({ setResSuccess, setResMessage }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const tableHeaders = ['Id', 'Name', 'Email', 'Phone', 'Role', 'Actions'];

  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [users, setUsers] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  // Get all products summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const getAllProductsSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          '/api/identity/admin/get-all-users-summary',
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        // console.log(response);
        isMounted && setUsers(response.data.users);
        isMounted && setRowCount(response.data.totalUsers);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllProductsSummary();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayedResponse);
    };
  }, [
    page,
    size,
    searchText,
    axiosPrivate,
    setResSuccess,
    setResMessage,
    setLoading,
  ]);

  const handleEditUser = (id) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'delete',
        url: `/api/identity/admin/delete-user/${id}`,
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

  // console.log('products', products);
  return (
    <div className='relative overflow-y-visible'>
      {/* search and filter row */}
      <SearchNDateOptions setSearchText={setSearchText} />
      {/* popular filters */}
      <PopularFilters popularFilters={userPopularFilters} />

      {/* table */}
      {loading && <LoadSpinner className='absolute top-1/2 left-1/2 z-20' />}
      <div className='min-h-[10rem] border border-gray-300 shadow rounded'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`p-1 lg:p-2 text-sm font-semibold tracking-wide text-left 
                            ${index === 1 && 'w-[10rem]'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr
                  className={`${index % 2 === 0 && 'bg-gray-100'}`}
                  key={index}
                >
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {user.id}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {user.firstName} {user.lastName}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    <div className='flex items-center gap-2'>
                      {user.email}
                      {user.emailVerified ? (
                        <BsCheckCircle className='border-green-500 text-emerald-500' />
                      ) : (
                        <BsExclamationCircle className='border-orange-500 text-orange-500' />
                      )}
                    </div>
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    <div className='flex items-center gap-2'>
                      {user.phone}
                      {user.phoneVerified ? (
                        <BsCheckCircle className='border-green-500 text-emerald-500' />
                      ) : (
                        <BsExclamationCircle className='border-orange-500 text-orange-500' />
                      )}
                    </div>
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {user.roles}
                  </td>

                  <td className='p-1 lg:p-2 text-xs'>
                    <div className='flex gap-1'>
                      <button
                        className='h-full flex items-center font-semibold px-1 py-0.5 opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 rounded'
                        onClick={() => handleEditUser(user.id)}
                      >
                        <AiOutlineEdit />
                        <span className='ml-1'>Edit</span>
                      </button>
                      <button
                        className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-red-50 text-red-700 border border-red-700 hover:bg-red-100 rounded'
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <AiOutlineDelete />
                        <span className='ml-0.5'>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <SizePageOptions
        rowCount={rowCount}
        size={size}
        setSize={setSize}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default UsersTable;
