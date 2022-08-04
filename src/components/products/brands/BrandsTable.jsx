import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import SearchNDateOptions from '../../tableComponents/SearchNDateOptions';
import PopularFilters from '../../tableComponents/PopularFilters';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import {
  brandPopularFilters,
  brandTableItems,
} from '../../../listItems/productItems/brandTableItems';

const BrandsTable = ({
  setResSuccess,
  setResMessage,
  rerender,
  handleEditBrand,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

  // Step 1: get all brands summary on page load
  useEffect(() => {
    let isMounted = true;
    const getAllBrandsSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          '/api/product/get-brands-summary',
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        isMounted && setBrands(response.data.brands);
        isMounted && setRowCount(response.data.totalBrands);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };
    getAllBrandsSummary();

    return () => {
      isMounted = false;
    };
  }, [
    axiosPrivate,
    page,
    size,
    searchText,
    setResMessage,
    setResSuccess,
    rerender,
  ]);

  return (
    <div className='overflow-y-visible'>
      {/* search and filter row */}
      <SearchNDateOptions setSearchText={setSearchText} />
      {/* popular filters */}
      <PopularFilters popularFilters={brandPopularFilters} />

      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={brandTableItems}
        dataPoints={brands}
        handleEdit={handleEditBrand}
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

export default BrandsTable;
