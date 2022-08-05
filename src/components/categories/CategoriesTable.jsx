import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SearchNDateOptions from '../tableComponents/SearchNDateOptions';
import PopularFilters from '../tableComponents/PopularFilters';
import TableComponent from '../tableComponents/TableComponent';
import SizePageOptions from '../tableComponents/SizePageOptions';
import {
  catPopularFilters,
  categoryTableItems,
} from '../../listItems/categoryItems/categoryTableItems';

const CategoriesTable = ({ setResSuccess, setResMessage, rerender }) => {
  let navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [categories, setCategories] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  // Get all categories summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const getAllCategoriesSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          '/api/product/admin/all-categories-summary',
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        isMounted && setCategories(response.data.categories);
        isMounted && setRowCount(response.data.totalCategories);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllCategoriesSummary();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayedResponse);
    };
  }, [
    axiosPrivate,
    page,
    size,
    setResMessage,
    setResSuccess,
    rerender,
    searchText,
  ]);

  const handleEditCategory = (id) => {
    navigate(`/category/edit/${id}`);
  };

  return (
    <div className='relative overflow-y-visible'>
      {/* search and filter row */}
      <SearchNDateOptions setSearchText={setSearchText} />
      {/* popular filters */}
      <PopularFilters popularFilters={catPopularFilters} />

      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={categoryTableItems}
        dataPoints={categories}
        handleEdit={handleEditCategory}
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

export default CategoriesTable;
