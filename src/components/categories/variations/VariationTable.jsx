import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { varTableItems } from '../../../listItems/categoryItems/attributeTableItems';
import {
  adminDeleteVariationById,
  adminAllVariationsSummary,
} from '../../../apis/variations.apis';

const VariationTable = ({
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [variations, setVariations] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      setLoading(true);
      adminAllVariationsSummary(page, size, searchText)
        .then((response) => {
          const { totalVariations, variations } = response.data;
          setVariations(variations);
          setRowCount(totalVariations);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
      setLoading(false);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [page, size, searchText, rerender, setResMessage, setResSuccess]);

  const handleEditVariation = (id) => {
    navigate(`/variation/edit/${id}`);
  };

  const handleDeleteVariation = async (id) => {
    setLoading(true);
    const { data } = await adminDeleteVariationById(id);
    setLoading(false);

    setResSuccess(data.success);
    setResMessage(data.message);
    if (data.success) {
      setRerender(!rerender);
    }
  };

  // console.log('variations', variations);

  return (
    <div className='overflow-y-visible'>
      {/* search row */}
      <div className='w-full md:w-1/3 pb-6'>
        <TableSearchInput setSearchText={setSearchText} />
      </div>
      {/* table */}
      <TableComponent
        loading={loading}
        tableItems={varTableItems}
        dataPoints={variations}
        handleEdit={handleEditVariation}
        allowDelete={true}
        handleDelete={handleDeleteVariation}
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

export default VariationTable;
