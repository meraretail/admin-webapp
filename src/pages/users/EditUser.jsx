import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Importing components
import ViewAddressCard from '../../components/users/ViewAddressCard';
import EditPassword from '../../components/users/EditPassword';
import EditProfile from '../../components/users/EditProfile';
import EditRole from '../../components/users/EditRole';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle from '../../components/common/PageTitle';

// Importing Icons
import { MdAddCircleOutline } from 'react-icons/md';
import { adminGetUserById } from '../../apis/users.apis';

const EditUser = () => {
  let { userId } = useParams();
  let navigate = useNavigate();

  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  const [user, setUser] = useState({
    id: userId,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    roles: [],
    emailVerified: false,
    phoneVerified: false,
    addresses: [],
  });

  useEffect(() => {
    adminGetUserById(userId)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        setResMessage(error.data.message);
        setResSuccess(error.data.success);
      });
  }, [userId, rerender]);

  const handleAddAddress = () => {
    navigate(`/user/${user.id}/add-address`, { state: { user } });
  };

  // console.log(user);
  return (
    <div>
      {/* page header */}
      <PageTitle
        title='Edit User Details'
        btnText='Go to all users list'
        btnLink='/users'
        type='negative'
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
      />
      {/* page header ends */}
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg
          resMessage={resMessage}
          resSuccess={resSuccess}
          showSuccess={true}
        />
        {/* success / error message zone ends */}

        {/* User information update forms start */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
          {/* col-1 row-1 */}
          <div className='py-5'>
            <EditProfile
              user={user}
              setResMessage={setResMessage}
              setResSuccess={setResSuccess}
            />
          </div>
          {/* col-2 row-1 */}
          <div className='md:py-5 space-y-7'>
            <EditPassword
              user={user}
              setResMessage={setResMessage}
              setResSuccess={setResSuccess}
            />
            <EditRole
              user={user}
              setResMessage={setResMessage}
              setResSuccess={setResSuccess}
            />
          </div>
        </div>
        {/* User information update forms end */}
        {/* address section starts */}
        <div>
          <div className='flex items-start justify-between border-b mb-4'>
            <h1 className='text-2xl font-bold'>User Addresses</h1>
            <button
              onClick={handleAddAddress}
              className='flex items-center font-semibold px-2 py-0.5 opacity-70 bg-green-50 text-green-700 border border-green-700 hover:bg-green-100 rounded'
            >
              <MdAddCircleOutline className='scale-110' />
              <span className='ml-2'>Add new address</span>
            </button>
          </div>
          {/* page header ends */}
          <ViewAddressCard
            user={user}
            setResMessage={setResMessage}
            setResSuccess={setResSuccess}
            setRerender={setRerender}
            rerender={rerender}
          />
        </div>
        {/* address section ends */}
      </div>
    </div>
  );
};

export default EditUser;
