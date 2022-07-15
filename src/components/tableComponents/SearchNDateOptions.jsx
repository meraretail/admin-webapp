import React from 'react';
import { dateFilterOptions } from '../../listItems/common/commonTableItems';
import TableSearchInput from './TableSearchInput';

const SearchNDateOptions = ({ setSearchText }) => {
  return (
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
  );
};

export default SearchNDateOptions;
