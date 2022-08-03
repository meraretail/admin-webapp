import { useState, useEffect } from 'react';
import SearchNDateOptions from '../../tableComponents/SearchNDateOptions';
import PopularFilters from '../../tableComponents/PopularFilters';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import {
  brandPopularFilters,
  brandTableItems,
} from '../../../listItems/productItems/brandTableItems';
import { adminAllBrandsSummary } from '../../../apis/products.apis';

const BrandsTable = ({
  setResSuccess,
  setResMessage,
  rerender,
  handleEditBrand,
}) => {
  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

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
  }, [page, size, searchText, setResMessage, setResSuccess, rerender]);

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
