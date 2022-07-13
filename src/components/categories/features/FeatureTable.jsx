import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadSpinner from '../../common/LoadSpinner';
import TableSearchInput from '../../tableComponents/TableSearchInput';
// Importing icons and services
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { featTableHeaders } from '../../../listItems/categoryItems/attributeTableItems';
import { pageSizeOptions } from '../../../listItems/common/commonTableItems';
import {
  adminDeleteFeatureById,
  adminAllFeaturesSummary,
} from '../../../apis/features.apis';

const FeatureTable = ({
  setResStatus,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [features, setFeatures] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [sizeOptionsVisible, setSizeOptionsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      adminAllFeaturesSummary(page, size, searchText)
        .then((response) => {
          setLoading(true);
          const { data, statusText } = response;
          const { totalFeatures, features } = data;
          setFeatures(features);
          setRowCount(totalFeatures);
          setResStatus(statusText);
          setResMessage(data.message);
          setLoading(false);
        })
        .catch((error) => setResMessage(error));
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [page, size, searchText, setResStatus, setResMessage, rerender]);

  const handleEditFeature = (id) => {
    navigate(`/feature/${id}`);
  };

  const handleDeleteFeature = async (id) => {
    setLoading(true);
    const response = await adminDeleteFeatureById(id);
    const { data, statusText } = response;
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);
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
      {/* search row */}
      <div className='w-56 pb-6'>
        <TableSearchInput setSearchText={setSearchText} />
      </div>
      {/* search row ends */}
      <div className='min-h-[10rem] border border-gray-300 shadow rounded'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              {featTableHeaders.map((header, index) => (
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
            {features &&
              features.map((feature, index) => (
                <tr
                  className={`${index % 2 === 0 && 'bg-gray-100'}`}
                  key={index}
                >
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {feature.id}
                  </td>
                  <td className='p-1 lg:p-2 text-sm text-gray-700'>
                    {feature.name}
                  </td>
                  <td className='p-1 lg:p-2 text-xs'>
                    {
                      <ul className='flex gap-1'>
                        {feature.featureOptions &&
                          feature.featureOptions.map((option, index) => (
                            <li
                              key={index}
                              className='px-1 py-0.5 opacity-70 bg-yellow-50 border border-yellow-700 rounded'
                            >
                              {option.name}
                            </li>
                          ))}
                      </ul>
                    }
                  </td>
                  <td className='p-1 lg:p-2 text-xs flex gap-1'>
                    <button
                      className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 rounded'
                      onClick={() => handleEditFeature(feature.id)}
                    >
                      <AiOutlineEdit />
                      <span className='ml-1'>Edit</span>
                    </button>
                    <button
                      className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-red-50 text-red-700 border border-red-700 hover:bg-red-100 rounded'
                      onClick={() => handleDeleteFeature(feature.id)}
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

export default FeatureTable;
