import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemContainer from '../../common/ItemContainer';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { featOptTableItems } from '../../../listItems/categoryItems/attributeTableItems';
import {
  adminDeleteFeatureOptionById,
  adminAllFeatureOptionsSummary,
} from '../../../apis/features.apis';

const FeatureOptionTable = ({
  id,
  setResStatus,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [featOptions, setFeatOptions] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      adminAllFeatureOptionsSummary(page, size, searchText, id)
        .then((response) => {
          setLoading(true);
          const { data, statusText } = response;
          const { totalFeatOptions, featOptions } = data;
          setFeatOptions(featOptions);
          setRowCount(totalFeatOptions);
          setResStatus(statusText);
          setResMessage(data.message);
          setLoading(false);
        })
        .catch((error) => setResMessage(error));
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [page, size, searchText, setResStatus, setResMessage, rerender, id]);

  const handleEditFeatureOption = (id) => {
    navigate(`/feature-option/edit/${id}`);
  };

  const handleDeleteFeatureOption = async (id) => {
    setLoading(true);
    const response = await adminDeleteFeatureOptionById(id);
    const { data, statusText } = response;
    setLoading(false);
    if (statusText === 'OK') {
      setRerender(!rerender);
    }
    setResStatus(statusText);
    setResMessage(data.message);
  };

  return (
    <ItemContainer title='Feature Options for feature'>
      <div className='overflow-y-visible'>
        {/* search row */}
        <div className='w-full md:w-1/3 pb-6'>
          <TableSearchInput setSearchText={setSearchText} />
        </div>
        {/* search row ends */}
        {/* table row */}
        <TableComponent
          loading={loading}
          tableItems={featOptTableItems}
          dataPoints={featOptions}
          handleEdit={handleEditFeatureOption}
          allowDelete={true}
          handleDelete={handleDeleteFeatureOption}
        />
        {/* table row ends */}
        {/* pagination row */}
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

export default FeatureOptionTable;
