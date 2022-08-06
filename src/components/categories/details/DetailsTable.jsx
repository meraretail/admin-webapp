import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { detailTableItems } from '../../../listItems/categoryItems/attributeTableItems';

const DetailsTable = ({
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  handleEditDetail,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [details, setDetails] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Get all features summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const getAllDetailsSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          '/api/product/admin/all-details-summary',
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        // console.log('response', response);
        isMounted && setDetails(response.data.details);
        isMounted && setRowCount(response.data.totalDetails);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllDetailsSummary();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayedResponse);
    };
  }, [
    axiosPrivate,
    page,
    size,
    searchText,
    setLoading,
    setResMessage,
    setResSuccess,
    rerender,
  ]);

  const handleDeleteDetail = async (detailId) => {
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'delete',
        url: `/api/product/admin/delete-detail/${detailId}`,
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      setRerender(!rerender);
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  return (
    <div className='overflow-y-visible py-2'>
      {/* search row */}
      <div className='w-full md:w-1/3 pb-6'>
        <TableSearchInput setSearchText={setSearchText} />
      </div>
      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={detailTableItems}
        dataPoints={details}
        handleEdit={handleEditDetail}
        allowDelete={true}
        handleDelete={handleDeleteDetail}
      />

      {/* pagination */}
      <SizePageOptions
        rowCount={rowCount}
        size={size}
        setSize={setSize}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default DetailsTable;
