import React from 'react';

const Button = ({ children, className, onClick, type }) => {
  return (
    <button
      className={`w-full rounded-md font-semibold text-sm p-1 ${className}`}
      onClick={onClick}
      type={type ? type : 'submit'}
    >
      {children}
    </button>
  );
};

export default Button;
