import React from 'react';

const FormInput = (props) => {
  const { label, value, onChange, id, className, ...inputProps } = props;
  return (
    <div className='relative'>
      <input
        id={id}
        value={value ? value : ''}
        onChange={onChange}
        {...inputProps}
        className={`peer px-3 py-2 bg-white border border-inputBorder placeholder-gray-400 
                    focus:outline-none focus:border-violet-500 focus:ring-violet-500 block 
                    w-full rounded sm:text-sm focus:ring-1 invalid:invalid-input
                    focus:placeholder:text-transparent transition duration-200 ${className}`}
      />
      <label
        htmlFor={id}
        className={`text-xs font-medium absolute -top-2 left-2.5 bg-white px-1
                  visible peer-focus:visible peer-placeholder-shown:invisible 
                  text-gray-400 peer-focus:text-violet-500 transition duration-200`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
