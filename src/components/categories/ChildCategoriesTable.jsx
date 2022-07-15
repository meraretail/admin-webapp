import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchNDateOptions from '../tableComponents/SearchNDateOptions';
import PopularFilters from '../tableComponents/PopularFilters';
import TableComponent from '../tableComponents/TableComponent';
import SizePageOptions from '../tableComponents/SizePageOptions';

import { adminAllChildCategoriesSummary } from '../../apis/childcategories.apis';

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
  const [childCategories, setChildCategories] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      setLoading(true);
      adminAllChildCategoriesSummary(page, size, searchText, subCategoryId)
        .then((response) => {
          // console.log(response.data);
          const { totalChildCategories, childCategories } = response.data;
          setChildCategories(childCategories);
          setRowCount(totalChildCategories);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
      setLoading(false);
    }, 100);

    return () => clearTimeout(delayedResponse);
  }, [
    page,
    searchText,
    size,
    setResMessage,
    setResSuccess,
    subCategoryId,
    rerender,
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
