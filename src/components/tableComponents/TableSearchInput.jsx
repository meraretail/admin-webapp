import { IoSearchOutline } from 'react-icons/io5';

const TableSearchInput = ({ setSearchText }) => {
  return (
    <div className='border border-gray-300 rounded shadow px-2 py-1 flex items-center'>
      <input
        type='text'
        placeholder='search...'
        className='outline-none placeholder:text-sm w-full'
        onChange={(e) => setSearchText(e.target.value)}
      />
      <IoSearchOutline />
    </div>
  );
};

export default TableSearchInput;
