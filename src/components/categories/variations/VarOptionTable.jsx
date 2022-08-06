import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ItemContainer from '../../common/ItemContainer';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { varOptTableItems } from '../../../listItems/categoryItems/attributeTableItems';

const VarOptionTable = ({
  variationId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  handleEditVariationOption,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [varOptions, setVarOptions] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Get all variation options summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const getAllVariationOptionsSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'get',
          url: `/api/product/admin/all-variation-options-summary-for-variation/${variationId}`,
          params: {
            page: page,
            size: size,
            search: searchText,
          },
        });

        // console.log('response', response);
        isMounted && setVarOptions(response.data.variationOptions);
        isMounted && setRowCount(response.data.totalVariationOptions);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllVariationOptionsSummary();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayedResponse);
    };
  }, [
    axiosPrivate,
    page,
    searchText,
    setLoading,
    setResMessage,
    setResSuccess,
    size,
    variationId,
    rerender,
  ]);

  const handleDeleteVariationOption = async (varOptId) => {
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'delete',
        url: `/api/product/admin/delete-variation/${varOptId}`,
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

  // console.log('varOptions', varOptions);

  return (
    <ItemContainer title='Variation Options for variation'>
      <div className='pt-4 overflow-y-visible'>
        {/* search row */}
        <div className='w-full md:w-1/3 pb-6'>
          <TableSearchInput setSearchText={setSearchText} />
        </div>
        {/* table */}
        <TableComponent
          loading={loading}
          tableItems={varOptTableItems}
          dataPoints={varOptions}
          handleEdit={handleEditVariationOption}
          allowDelete={true}
          handleDelete={handleDeleteVariationOption}
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
    </ItemContainer>
  );
};

export default VarOptionTable;
