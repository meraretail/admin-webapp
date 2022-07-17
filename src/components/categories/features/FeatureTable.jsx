import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableSearchInput from '../../tableComponents/TableSearchInput';
import TableComponent from '../../tableComponents/TableComponent';
import SizePageOptions from '../../tableComponents/SizePageOptions';
import { featTableItems } from '../../../listItems/categoryItems/attributeTableItems';
import {
  adminDeleteFeatureById,
  adminAllFeaturesSummary,
} from '../../../apis/features.apis';

const FeatureTable = ({
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [features, setFeatures] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const delayedResponse = setTimeout(async () => {
      setLoading(true);
      adminAllFeaturesSummary(page, size, searchText)
        .then((response) => {
          const { totalFeatures, features } = response.data;
          setFeatures(features);
          setRowCount(totalFeatures);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
      setLoading(false);
    }, 200);

    return () => clearTimeout(delayedResponse);
  }, [page, size, searchText, rerender, setResSuccess, setResMessage]);

  const handleEditFeature = (id) => {
    navigate(`/feature/${id}`);
  };

  const handleDeleteFeature = async (id) => {
    setLoading(true);
    const { data } = await adminDeleteFeatureById(id);
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
        tableItems={featTableItems}
        dataPoints={features}
        handleEdit={handleEditFeature}
        allowDelete={true}
        handleDelete={handleDeleteFeature}
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

export default FeatureTable;
