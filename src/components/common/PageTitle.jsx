import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const PageTitle = ({ className, title, btnLink, btnIcon, btnText, type }) => {
  const navigate = useNavigate();
  const btnClickHandler = () => {
    if (btnLink) {
      navigate(btnLink);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={`${className} flex items-center justify-between border-b fixed top-0 left-[12rem] right-0 px-4 shadow bg-white z-20`}
    >
      <h1 className='font-manrope text-2xl font-bold my-4'>{title}</h1>
      <button
        onClick={btnClickHandler}
        className={`flex flex-nowrap items-center font-semibold px-2 py-0.5 opacity-70 rounded border ${
          type === 'negative'
            ? 'bg-red-50 text-red-700 border-red-700 hover:bg-red-100'
            : type === 'positive'
            ? 'bg-green-50 text-green-700 border-green-700 hover:bg-green-100'
            : 'bg-violet-50 text-violet-700 border-violet-700 hover:bg-violet-100'
        }`}
      >
        {btnIcon ? btnIcon : <IoArrowBackCircleOutline className='scale-110' />}
        <span className='ml-2 whitespace-nowrap'>{btnText}</span>
      </button>
    </div>
  );
};

export default PageTitle;
