import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing icons and services
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// Importing components
import LoadSpinner from '../common/LoadSpinner';
import TableSearchInput from '../../components/tableComponents/TableSearchInput';
import { adminGetAllUsers, adminDeleteUserById } from '../../apis/users.apis';
import {
  userPopularFilters,
  userTableHeaders,
} from '../../listItems/userItems/userTableItems';
import {
  dateFilterOptions,
  pageSizeOptions,
} from '../../listItems/common/commonTableItems';

const UsersTable = ({ setResSuccess, setResMessage }) => {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [users, setUsers] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [sizeOptionsVisible, setSizeOptionsVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  let navigate = useNavigate();

  // Step 1: 100 ms lag at first start as well - Fetch users table at page load
  useEffect(() => {
    setLoading(true);
    const delayedResponse = setTimeout(async () => {
      adminGetAllUsers(page, size, searchText)
        .then((response) => {
          // console.log('response', response);
          const { totalUsers, users, success, message } = response.data;
          setUsers(users);
          setRowCount(totalUsers);
          setResSuccess(success);
          setResMessage(message);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
    }, 100);
    setLoading(false);

    return () => clearTimeout(delayedResponse);
  }, [page, searchText, setResMessage, setResSuccess, size, rerender]);

  const handleEditUser = (id) => {
    navigate(`/user/${id}`);
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    const response = await adminDeleteUserById(id);
    const { success, message } = response.data;
    setResSuccess(success);
    setResMessage(message);
    setLoading(false);

    if (success) {
      setRerender(!rerender);
    }
  };

  const sizeOptionClickHandler = (option) => {
    setSize(option);
    setSizeOptionsVisible(!sizeOptionsVisible);
  };

  const prevPageClickHandler = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const nextPageClickHandler = () => {
    if (page < Math.ceil(rowCount / size) - 1) {
      setPage(page + 1);
    }
  };

  // console.log('products', products);
  return (
    <div className='relative overflow-y-visible'>
      {/* search and filter row */}
      <div className='flex justify-between py-4'>
        <TableSearchInput setSearchText={setSearchText} />
        <div className='flex items-center'>
          <span className='text-sm'>Choose date range: </span>
          <select
            name='filter'
            id='filter'
            className='border rounded px-2 py-1 outline-none ml-2 text-sm'
          >
            {dateFilterOptions.map((range, index) => (
              <option value='option1' key={index}>
                {range.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* popular filters */}
      <div className='py-2 flex items-center gap-2'>
        <span className='text-sm'>Popular filters: </span>
        <ul className='flex items-center gap-1'>
          {userPopularFilters.map((filter, index) => (
            <li
              className='px-2 py-1 rounded-full border text-xs font-barlow'
              key={index}
            >
              {filter.text}
            </li>
          ))}
        </ul>
      </div>
      {loading && <LoadSpinner className='absolute top-1/2 left-1/2 z-20' />}
      <div className='min-h-[10rem] border border-gray-300 shadow rounded'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              {userTableHeaders.map((header, index) => (
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
                    {user.email}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {user.phone}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {user.roles}
                  </td>
                  <td className='p-1 lg:p-2 text-xs text-gray-700 flex gap-1'>
                    {user.emailVerified ? (
                      <span className='bg-green-50 border rounded border-green-600 text-green-600 px-1 py-0.5 opacity-75 font-semibold'>
                        email
                      </span>
                    ) : (
                      <span className='bg-red-50 border rounded border-red-600 text-red-600 px-1 py-0.5 opacity-75 font-semibold'>
                        no
                      </span>
                    )}
                    {user.phoneVerified ? (
                      <span className='bg-green-50 border rounded border-green-600 text-green-600 px-1 py-0.5 opacity-75 font-semibold'>
                        phone
                      </span>
                    ) : (
                      <span className='bg-red-50 border rounded border-red-600 text-red-600 px-1 py-0.5 opacity-75 font-semibold'>
                        no
                      </span>
                    )}
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
      {/* items per page and pages */}
      <div className='flex justify-between items-start py-4'>
        {/* left section */}
        <div className='flex gap-2'>
          <div>Items per page:</div>
          <div>
            <button
              className='w-20 py-0.5 px-2 rounded border border-gray-300 flex items-center justify-between'
              onClick={() => setSizeOptionsVisible(!sizeOptionsVisible)}
            >
              {size} <RiArrowDropDownLine />
            </button>
            <ul
              className={`${
                sizeOptionsVisible ? 'block' : 'hidden'
              } border border-gray-300 z-30 relative`}
            >
              {pageSizeOptions.map((option, index) => (
                <li
                  onClick={() => sizeOptionClickHandler(option)}
                  className='cursor-pointer px-2 py-0.5 text-gray-500 text-md'
                  key={index}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* right section */}
        <div className='flex items-center gap-1'>
          <div>Pages: </div>
          <div>{page + 1}</div>
          <div>of</div>
          <div>{Math.ceil(rowCount / size)}</div>
          <button className='w-6 h-6 rounded-full flex items-center justify-center border border-gray-400'>
            <GrFormPrevious onClick={prevPageClickHandler} />
          </button>
          <button className='w-6 h-6 rounded-full flex items-center justify-center border border-gray-400'>
            <GrFormNext onClick={nextPageClickHandler} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
