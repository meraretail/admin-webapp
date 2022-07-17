import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemContainer from '../../common/ItemContainer';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { varOptTableItems } from '../../../listItems/categoryItems/attributeTableItems';
import {
  adminDeleteVariationOptionById,
  adminAllVariationOptionsSummaryForVariation,
} from '../../../apis/variations.apis';

const VarOptionTable = ({
  id,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [varOptions, setVarOptions] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      setLoading(true);
      adminAllVariationOptionsSummaryForVariation(page, size, searchText, id)
        .then((response) => {
          // console.log(response.data);
          const { totalVariationOptions, variationOptions } = response.data;
          setVarOptions(variationOptions);
          setRowCount(totalVariationOptions);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
      setLoading(false);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [page, size, searchText, id, setResMessage, setResSuccess, rerender]);

  const handleEditVariationOption = (id) => {
    navigate(`/variation-option/edit/${id}`);
  };

  const handleDeleteVariationOption = async (id) => {
    setLoading(true);
    const { data } = await adminDeleteVariationOptionById(id);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    if (data.success) {
      setRerender(!rerender);
    }
  };

  // console.log('varOptions', varOptions);

  return (
    <ItemContainer title='Variation Options for variation'>
      <div className='pt-4 overflow-y-visible'>
        {/* search row */}
        <div className='w-full md:w-1/3 pb-6'>
          <TableSearchInput setSearchText={setSearchText} />
        </div>
        {/* table */}
        <TableComponent
          loading={loading}
          tableItems={varOptTableItems}
          dataPoints={varOptions}
          handleEdit={handleEditVariationOption}
          allowDelete={true}
          handleDelete={handleDeleteVariationOption}
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
    </ItemContainer>
  );
};

export default VarOptionTable;
