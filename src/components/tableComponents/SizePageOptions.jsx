import { useState, useRef, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { pageSizeOptions } from '../../listItems/common/commonTableItems';

const SizePageOptions = ({ rowCount, size, setSize, page, setPage }) => {
  const [sizeOptionsVisible, setSizeOptionsVisible] = useState(false);

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

  // Close dropdown when clicked outside of it
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSizeOptionsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className='flex justify-between items-start py-4'>
      {/* left section */}
      <div className='flex items-center gap-2'>
        <div>Items per page:</div>
        <div ref={wrapperRef}>
          <button
            className='w-20 py-0.5 px-2 rounded border border-gray-300 flex items-center justify-between'
            onClick={() => setSizeOptionsVisible(!sizeOptionsVisible)}
          >
            {size} <RiArrowDropDownLine />
          </button>
          <ul
            className={`${
              sizeOptionsVisible ? 'block' : 'hidden'
            } border border-gray-300 z-30 relative rounded`}
          >
            {pageSizeOptions.map((option, index) => (
              <li
                onClick={() => sizeOptionClickHandler(option)}
                className='cursor-pointer px-2 py-0.5 text-gray-600'
                key={index}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <div>of {rowCount}</div>
      </div>
      {/* right section */}
      <div className='flex items-center gap-1'>
        <div>Pages: </div>
        <div>{page + 1}</div>
        <div>of</div>
        <div>{Math.ceil(rowCount / size) || 0}</div>
        <button className='w-6 h-6 rounded-full flex items-center justify-center border border-gray-400'>
          <GrFormPrevious onClick={prevPageClickHandler} />
        </button>
        <button className='w-6 h-6 rounded-full flex items-center justify-center border border-gray-400'>
          <GrFormNext onClick={nextPageClickHandler} />
        </button>
      </div>
    </div>
  );
};

export default SizePageOptions;
