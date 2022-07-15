import React from 'react';

const PopularFilters = ({ popularFilters }) => {
  return (
    <div className='py-2 flex items-center gap-2'>
      <span className='text-sm'>Popular filters: </span>
      <ul className='flex items-center gap-1'>
        {popularFilters.map((filter, index) => (
          <li
            className='px-2 py-1 rounded-full border text-xs font-barlow'
            key={index}
          >
            {filter.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularFilters;
