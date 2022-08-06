import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SearchNDateOptions from '../tableComponents/SearchNDateOptions';
import PopularFilters from '../tableComponents/PopularFilters';
import TableComponent from '../tableComponents/TableComponent';
import SizePageOptions from '../tableComponents/SizePageOptions';
import {
  pdtPopularFilters,
  productTableItems,
} from '../../listItems/productItems/productTableItems';

const ProductsTable = ({
  childCategoryId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [products, setProducts] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  let navigate = useNavigate();

  // Get all products summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const getAllProductsSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          '/api/product/admin/all-products-summary',
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        // console.log(response);
        isMounted && setProducts(response.data.products);
        isMounted && setRowCount(response.data.totalProducts);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllProductsSummary();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayedResponse);
    };
  }, [page, size, searchText, axiosPrivate, setResSuccess, setResMessage]);

  const handleEditProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // console.log('products', products);
  return (
    <div className='relative overflow-y-visible'>
      {/* search and filter row */}
      <SearchNDateOptions setSearchText={setSearchText} />
      {/* popular filters */}
      <PopularFilters popularFilters={pdtPopularFilters} />

      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={productTableItems}
        dataPoints={products}
        handleEdit={handleEditProduct}
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

export default ProductsTable;
