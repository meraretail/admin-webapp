import LoadSpinner from '../common/LoadSpinner';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const TableComponent = ({
  loading,
  tableItems,
  dataPoints,
  handleEdit,
  allowDelete,
  handleDelete,
}) => {
  return (
    <div className='relative'>
      {loading && <LoadSpinner className='absolute top-1/3 left-1/2 z-20' />}
      <div className='min-h-[10rem] border border-gray-300 shadow rounded'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              {tableItems.map((item, index) => (
                <th
                  className={`p-1 lg:p-2 text-sm font-semibold tracking-wide ${
                    item.center ? 'text-center' : 'text-left'
                  }`}
                  key={index}
                >
                  {item.label}
                </th>
              ))}
              <th className='p-1 lg:p-2 text-sm font-semibold tracking-wide text-left'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dataPoints &&
              dataPoints.map((data, index) => (
                <tr
                  className={`${index % 2 === 0 && 'bg-gray-100'}`}
                  key={index}
                >
                  {tableItems.map((item, itemIndex) =>
                    item.type && item.type === 'boolean' ? (
                      <td
                        className={`p-1 lg:p-2 text-sm text-gray-700 ${
                          item.center ? 'text-center' : 'text-left'
                        }`}
                        key={itemIndex}
                      >
                        {data[item.jsonKey] === 0 ? 'No' : 'Yes'}
                      </td>
                    ) : (
                      <td
                        className={`p-1 lg:p-2 text-sm text-gray-700 ${
                          item.center ? 'text-center' : 'text-left'
                        }`}
                        key={itemIndex}
                      >
                        {data[item.jsonKey]}
                      </td>
                    )
                  )}

                  <td className='p-1 lg:p-2 text-xs'>
                    <span className='flex gap-1'>
                      <button
                        className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100 rounded'
                        onClick={() => handleEdit(data.id)}
                      >
                        <AiOutlineEdit />
                        <span className='ml-0.5'>Edit</span>
                      </button>
                      {allowDelete && (
                        <button
                          className='flex items-center font-semibold px-1 py-0.5 opacity-70 bg-red-50 text-red-700 border border-red-700 hover:bg-red-100 rounded'
                          onClick={() => handleDelete(data.id)}
                        >
                          <AiOutlineDelete />
                          <span className='ml-0.5'>Delete</span>
                        </button>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
