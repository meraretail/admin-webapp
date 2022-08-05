import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SearchNDateOptions from '../tableComponents/SearchNDateOptions';
import PopularFilters from '../tableComponents/PopularFilters';
import TableComponent from '../tableComponents/TableComponent';
import SizePageOptions from '../tableComponents/SizePageOptions';
import {
  catPopularFilters,
  subCategoryTableItems,
} from '../../listItems/categoryItems/categoryTableItems';

const SubCategoriesTable = ({
  categoryId,
  setResSuccess,
  setResMessage,
  rerender,
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [subCategories, setSubCategories] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  // Get all sub categories summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const categoryId = null;
    const getAllSubCategoriesSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/api/product/admin/all-subcategories-summary/${categoryId}`,
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        isMounted && setSubCategories(response.data.subCategories);
        isMounted && setRowCount(response.data.totalSubCategories);
      } catch (error) {
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
      setLoading(false);
    };

    const delayedResponse = setTimeout(async () => {
      await getAllSubCategoriesSummary();
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

  const handleEditSubCategory = (id) => {
    navigate(`/sub-category/edit/${id}`);
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
        tableItems={subCategoryTableItems}
        dataPoints={subCategories}
        handleEdit={handleEditSubCategory}
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

export default SubCategoriesTable;
