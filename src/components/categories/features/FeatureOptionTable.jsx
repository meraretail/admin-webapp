import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ItemContainer from '../../common/ItemContainer';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { featOptTableItems } from '../../../listItems/categoryItems/attributeTableItems';

const FeatureOptionTable = ({
  featureId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  handleEditFeatureOption,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [featOptions, setFeatOptions] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Get all variation options summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const getAllFeatureOptionsSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'get',
          url: `/api/product/admin/all-feature-options-summary-for-feature/${featureId}`,
          params: {
            page: page,
            size: size,
            search: searchText,
          },
        });

        // console.log('response', response);
        isMounted && setFeatOptions(response.data.featureOptions);
        isMounted && setRowCount(response.data.totalfeatureOptions);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllFeatureOptionsSummary();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayedResponse);
    };
  }, [
    axiosPrivate,
    featureId,
    page,
    size,
    searchText,
    setLoading,
    setResMessage,
    setResSuccess,
    rerender,
  ]);

  const handleDeleteFeatureOption = async (featOptId) => {
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'delete',
        url: `/api/product/admin/delete-feature-option/${featOptId}`,
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
    <ItemContainer title='Feature Options for feature'>
      <div className='overflow-y-visible'>
        {/* search row */}
        <div className='w-full md:w-1/3 pb-6'>
          <TableSearchInput setSearchText={setSearchText} />
        </div>
        {/* search row ends */}
        {/* table row */}
        <TableComponent
          loading={loading}
          tableItems={featOptTableItems}
          dataPoints={featOptions}
          handleEdit={handleEditFeatureOption}
          allowDelete={true}
          handleDelete={handleDeleteFeatureOption}
        />
        {/* table row ends */}
        {/* pagination row */}
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

export default FeatureOptionTable;
