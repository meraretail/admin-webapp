import React from 'react';

const SuccErrMsg = ({ resMessage, resSuccess, showSuccess }) => {
  return (
    <div
      className={`w-full py-1 my-2 text-center border rounded ${
        resMessage && resMessage !== '' && resSuccess !== true
          ? 'bg-red-50 border-red-700 text-red-700'
          : resMessage && resMessage !== '' && showSuccess
          ? 'bg-green-50 border-green-700 text-green-700'
          : 'hidden'
      }`}
    >
      <span>{resMessage}</span>
    </div>
  );
};

export default SuccErrMsg;
