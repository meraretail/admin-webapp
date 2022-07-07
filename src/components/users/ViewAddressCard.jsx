import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadSpinner from '../common/LoadSpinner';
import {
  adminDeleteUserAddress,
  adminMakeAddressDefault,
} from '../../apis/users.apis';

const ViewAddressCard = ({
  user,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // edit user address
  const handleEditAddress = (address) => {
    navigate(`/user/${user.id}/edit-address/${address.id}`, {
      state: { address },
    });
  };

  // delete user address
  const handleDeleteAddress = async (addressId) => {
    setLoading(true);
    const response = await adminDeleteUserAddress(user.id, addressId);
    // console.log(response);
    const { success, message } = response;
    setResSuccess(success);
    setResMessage(message);
    setRerender(!rerender);
  };

  // make address as default
  const handleSetAsDefault = async (addressId) => {
    // console.log(addressId);
    setLoading(true);
    const response = await adminMakeAddressDefault(user.id, addressId);
    setLoading(false);
    // console.log(response);
    const { success, message } = response;
    setResSuccess(success);
    setResMessage(message);
    setRerender(!rerender);
  };

  return (
    <div>
      {loading && (
        <div>
          <LoadSpinner />
        </div>
      )}
      <ul className='flex gap-4'>
        {user.addresses.map((address, index) => (
          <li
            key={index}
            className='border shadow-md rounded text-sm p-4 w-[17rem] h-[12rem] flex flex-col justify-between'
          >
            <div>
              <p className='font-bold'>{address.contactName}</p>
              <p>{address.street1}</p>
              <p>{address.street2}</p>
              <p>
                {address.city} - {address.pincode}, {address.state},{' '}
                {address.country}
              </p>
              <p>Phone: {address.phoneNumber}</p>
            </div>
            <div className='flex items-center gap-2 text-blue-800 divide-x'>
              <button onClick={() => handleEditAddress(address)}>Edit</button>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className='pl-2'
              >
                Delete
              </button>
              {address.isDefault === false ? (
                <button
                  className='pl-2'
                  onClick={() => handleSetAsDefault(address.id)}
                >
                  Set as default
                </button>
              ) : (
                <button className='pl-2 text-red-700'>Default</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAddressCard;
