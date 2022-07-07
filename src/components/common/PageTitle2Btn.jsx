import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { CgFolderAdd } from 'react-icons/cg';

const PageTitle2Btn = ({
  className,
  title,
  btn1Link,
  btn1Text,
  btn1Icon,
  btn1Type,
  btn2Link,
  btn2Text,
  btn2Icon,
  btn2Type,
}) => {
  const navigate = useNavigate();
  // btn 1 click
  const handleBtn1Click = () => {
    navigate(btn1Link);
  };

  // btn 2 - usually back button
  const handleBtn2Click = () => {
    if (btn2Link) {
      navigate(btn2Link);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={`${className} bg-white z-20 flex flex-wrap items-center justify-between border-b`}
    >
      <h1 className='font-manrope text-2xl font-bold my-4'>{title}</h1>
      <div className='flex flex-wrap items-center gap-4'>
        {/* button 1 */}
        <button
          onClick={handleBtn1Click}
          className={`flex flex-nowrap items-center font-semibold px-2 py-0.5 opacity-70 rounded border ${
            btn1Type === 'negative'
              ? 'bg-red-50 text-red-700 border-red-700 hover:bg-red-100'
              : btn1Type === 'positive'
              ? 'bg-green-50 text-green-700 border-green-700 hover:bg-green-100'
              : 'bg-violet-50 text-violet-700 border-violet-700 hover:bg-violet-100'
          }`}
        >
          {btn1Icon ? btn1Icon : <CgFolderAdd className='scale-110' />}
          <span className='ml-2 whitespace-nowrap'>{btn1Text}</span>
        </button>
        {/* button 1 ends */}
        {/* button 2 */}
        <button
          onClick={handleBtn2Click}
          className={`flex flex-nowrap items-center font-semibold px-2 py-0.5 opacity-70 rounded border ${
            btn2Type === 'negative'
              ? 'bg-red-50 text-red-700 border-red-700 hover:bg-red-100'
              : btn2Type === 'positive'
              ? 'bg-green-50 text-green-700 border-green-700 hover:bg-green-100'
              : 'bg-violet-50 text-violet-700 border-violet-700 hover:bg-violet-100'
          }`}
        >
          {btn2Icon ? (
            btn2Icon
          ) : (
            <IoArrowBackCircleOutline className='scale-110' />
          )}
          <span className='ml-2 whitespace-nowrap'>{btn2Text}</span>
        </button>
        {/* button 2 ends */}
      </div>
    </div>
  );
};

export default PageTitle2Btn;
