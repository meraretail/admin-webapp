import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SearchNDateOptions from '../tableComponents/SearchNDateOptions';
import PopularFilters from '../tableComponents/PopularFilters';
import TableComponent from '../tableComponents/TableComponent';
import SizePageOptions from '../tableComponents/SizePageOptions';
import {
  catPopularFilters,
  childCatTableItems,
} from '../../listItems/categoryItems/categoryTableItems';

const ChildCategoriesTable = ({
  setResSuccess,
  setResMessage,
  subCategoryId,
  rerender,
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [childCategories, setChildCategories] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  // Get all categories summary on page load with 500ms lag
  // 500ms is most optimum time considering typing speed
  useEffect(() => {
    let isMounted = true;
    const subCategoryId = null;
    const getAllSubCategoriesSummary = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/api/product/admin/all-childcategories-summary/${subCategoryId}`,
          {
            params: {
              page: page,
              size: size,
              search: searchText,
            },
          }
        );
        isMounted && setChildCategories(response.data.childCategories);
        isMounted && setRowCount(response.data.totalChildCategories);
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

  const handleEditChildCategory = (id) => {
    navigate(`/child-category/edit/${id}`);
  };

  // console.log('childCategories', childCategories);

  return (
    <div className='overflow-y-visible'>
      {/* search and date row */}
      <SearchNDateOptions setSearchText={setSearchText} />
      {/* popular filters */}
      <PopularFilters popularFilters={catPopularFilters} />

      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={childCatTableItems}
        dataPoints={childCategories}
        handleEdit={handleEditChildCategory}
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

export default ChildCategoriesTable;
