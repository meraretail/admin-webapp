import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { varTableItems } from '../../../listItems/categoryItems/attributeTableItems';

const VariationTable = ({
  childCategoryId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [variations, setVariations] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Get all categories summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const getAllVariationsSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/api/product/admin/all-variations-summary/${childCategoryId}`,
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        // console.log('response', response);
        isMounted && setVariations(response.data.variations);
        isMounted && setRowCount(response.data.totalVariations);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllVariationsSummary();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayedResponse);
    };
  }, [
    axiosPrivate,
    childCategoryId,
    page,
    searchText,
    setLoading,
    setResMessage,
    setResSuccess,
    size,
  ]);

  const handleEditVariation = (id) => {
    navigate(`/variation/edit/${id}`);
  };

  const handleDeleteVariation = async (id) => {
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'DELETE',
        url: `/api/product/admin/delete-variation/${id}`,
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  // console.log('variations', variations);

  return (
    <div className='overflow-y-visible'>
      {/* search row */}
      <div className='w-full md:w-1/3 pb-6'>
        <TableSearchInput setSearchText={setSearchText} />
      </div>
      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={varTableItems}
        dataPoints={variations}
        handleEdit={handleEditVariation}
        allowDelete={true}
        handleDelete={handleDeleteVariation}
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

export default VariationTable;
