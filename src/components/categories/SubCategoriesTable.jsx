import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadSpinner from '../common/LoadSpinner';
import TableSearchInput from '../tableComponents/TableSearchInput';

// Importing icons and services
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { AiOutlineEdit } from 'react-icons/ai';
import { adminGetAllSubCategories } from '../../apis/categories.apis';
import {
  catPopularFilters,
  subCatTableHeaders,
} from '../../listItems/categoryItems/categoryTableItems';
import {
  dateFilterOptions,
  pageSizeOptions,
} from '../../listItems/common/commonTableItems';

const SubCategoriesTable = ({
  setResSuccess,
  setResMessage,
  categoryId,
  rerender,
}) => {
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [sizeOptionsVisible, setSizeOptionsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      setLoading(true);
      adminGetAllSubCategories(page, size, searchText, categoryId)
        .then((response) => {
          const { totalSubCategories, subCategories, success, message } =
            response.data;
          setSubCategories(subCategories);
          setRowCount(totalSubCategories);
          setResSuccess(success);
          setResMessage(message);
        })
        .catch((error) => setResMessage(error));
      setLoading(false);
    }, 100);

    return () => clearTimeout(delayedResponse);
  }, [categoryId, page, searchText, setResMessage, setResSuccess, size]);

  const handleEditSubCategory = (id) => {
    navigate(`/sub-categories/${id}`);
  };

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

  return (
    <div className='relative overflow-y-visible'>
      {/* search and filter row */}
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
      {/* popular filters */}
      <div className='py-2 flex items-center gap-2'>
        <span className='text-sm'>Popular filters: </span>
        <ul className='flex items-center gap-1'>
          {catPopularFilters.map((filter, index) => (
            <li
              className='px-2 py-1 rounded-full border text-xs font-barlow'
              key={index}
            >
              {filter.text}
            </li>
          ))}
        </ul>
      </div>
      <div className='min-h-[10rem] border border-gray-300 shadow rounded'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              {subCatTableHeaders.map((header, index) => (
                <th
                  className='p-1 lg:p-2 text-sm font-semibold tracking-wide text-left md:min-w-[2rem]'
                  key={index}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subCategories &&
              subCategories.map((subCategory, index) => (
                <tr
                  className={`${index % 2 === 0 && 'bg-gray-100'}`}
                  key={index}
                >
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {subCategory.id}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {subCategory.name}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {subCategory.category}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {subCategory.childCategories}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {subCategory.products}
                  </td>
                  <td className='p-1 lg:p-2 text-xs'>
                    <button
                      className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 rounded'
                      onClick={() => handleEditSubCategory(subCategory.id)}
                    >
                      <AiOutlineEdit />
                      <span className='ml-1'>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <LoadSpinner className='absolute top-[7rem] left-[22rem] z-20' />
      )}
      {/* items per page and pages */}
      <div className='flex justify-between items-start py-4'>
        {/* left section */}
        <div className='flex gap-2'>
          <div>Items per page:</div>
          <div>
            <button
              className='w-20 py-0.5 px-2 rounded border border-gray-300 flex items-center justify-between'
              onClick={() => setSizeOptionsVisible(!sizeOptionsVisible)}
            >
              {size} <RiArrowDropDownLine />
            </button>
            <ul
              className={`${
                sizeOptionsVisible ? 'block' : 'hidden'
              } border border-gray-300 z-30 relative`}
            >
              {pageSizeOptions.map((option, index) => (
                <li
                  onClick={() => sizeOptionClickHandler(option)}
                  className='cursor-pointer px-2 py-0.5 text-gray-500 text-md'
                  key={index}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* right section */}
        <div className='flex items-center gap-1'>
          <div>Pages: </div>
          <div>{page + 1}</div>
          <div>of</div>
          <div>{Math.ceil(rowCount / size)}</div>
          <button className='w-6 h-6 rounded-full flex items-center justify-center border border-gray-400'>
            <GrFormPrevious onClick={prevPageClickHandler} />
          </button>
          <button className='w-6 h-6 rounded-full flex items-center justify-center border border-gray-400'>
            <GrFormNext onClick={nextPageClickHandler} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoriesTable;
