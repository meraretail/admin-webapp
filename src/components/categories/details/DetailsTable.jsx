import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { detailTableItems } from '../../../listItems/categoryItems/attributeTableItems';
import {
  adminDeleteDetailById,
  adminAllDetailsSummary,
} from '../../../apis/details.apis';

const DetailsTable = ({
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [details, setDetails] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      setLoading(true);
      adminAllDetailsSummary(page, size, searchText)
        .then((response) => {
          const { totalDetails, details } = response.data;
          setDetails(details);
          setRowCount(totalDetails);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
      setLoading(false);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [page, size, searchText, rerender, setResSuccess, setResMessage]);

  const handleEditDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDeleteDetail = async (id) => {
    setLoading(true);
    const { data } = await adminDeleteDetailById(id);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);
    if (data.success) {
      setRerender(!rerender);
    }
  };

  return (
    <div className='overflow-y-visible'>
      {/* search row */}
      <div className='w-full md:w-1/3 pb-6'>
        <TableSearchInput setSearchText={setSearchText} />
      </div>
      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={detailTableItems}
        dataPoints={details}
        handleEdit={handleEditDetail}
        allowDelete={true}
        handleDelete={handleDeleteDetail}
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

export default DetailsTable;
