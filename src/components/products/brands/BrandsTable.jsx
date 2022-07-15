import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadSpinner from '../../common/LoadSpinner';
import TableSearchInput from '../../tableComponents/TableSearchInput';

import { RiArrowDropDownLine } from 'react-icons/ri';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

import {
  brandPopularFilters,
  brandTableHeaders,
} from '../../../listItems/productItems/brandTableItems';
import {
  dateFilterOptions,
  pageSizeOptions,
} from '../../../listItems/common/commonTableItems';
import {
  adminDeleteBrandById,
  adminAllBrandsSummary,
} from '../../../apis/products.apis';

const BrandsTable = ({
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [sizeOptionsVisible, setSizeOptionsVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const delayedResponse = setTimeout(async () => {
      adminAllBrandsSummary(page, size, searchText)
        .then((response) => {
          const { totalBrands, brands } = response.data;
          setBrands(brands);
          setRowCount(totalBrands);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
    }, 200);
    setLoading(false);

    return () => clearTimeout(delayedResponse);
  }, [page, size, searchText, setResMessage, rerender, setResSuccess]);

  const handleEditBrandGeo = (id) => {
    navigate(`/brand/${id}`, { replace: true });
  };

  const handleDeleteBrandGeo = async (id) => {
    setLoading(true);
    const { data } = await adminDeleteBrandById(id);
    setLoading(false);

    setResSuccess(data.success);
    setResMessage(data.message);
    setRerender(!rerender);
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
          {brandPopularFilters.map((filter, index) => (
            <li
              className='px-2 py-1 rounded-full border text-xs font-barlow'
              key={index}
            >
              {filter.text}
            </li>
          ))}
        </ul>
      </div>
      {loading && <LoadSpinner className='absolute top-1/2 left-1/2 z-20' />}
      <div className='min-h-[10rem] border border-gray-300 shadow rounded'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              {brandTableHeaders.map((header, index) => (
                <th
                  className='p-1 lg:p-2 text-sm font-semibold tracking-wide text-left md:min-w-[2rem] last:max-w-[2rem]'
                  key={index}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {brands &&
              brands.map((brand, index) => (
                <tr
                  className={`${index % 2 === 0 && 'bg-gray-100'}`}
                  key={index}
                >
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {brand.id}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {brand.name}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {brand.brandType}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {brand.brandGeo}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {brand.products}
                  </td>
                  <td className='p-1 lg:p-2 text-xs flex gap-1'>
                    <button
                      className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 rounded'
                      onClick={() => handleEditBrandGeo(brand.id)}
                    >
                      <AiOutlineEdit />
                      <span className='ml-1'>Edit</span>
                    </button>
                    <button
                      className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-red-50 text-red-700 border border-red-700 hover:bg-red-100 rounded'
                      onClick={() => handleDeleteBrandGeo(brand.id)}
                    >
                      <AiOutlineDelete />
                      <span className='ml-0.5'>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

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
          <div>{Math.ceil(rowCount / size) || 0}</div>
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

export default BrandsTable;
