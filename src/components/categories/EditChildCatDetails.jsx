import { useEffect, useState } from 'react';
import { adminUpdateChildCategoryDetails } from '../../apis/childcategories.apis';
import { listAllDetails } from '../../apis/product.apis';
import Button from '../formComponents/Button';
import LoadingButton from '../formComponents/LoadingButton';

const EditChildCatDetails = ({
  childCategory,
  setResStatus,
  setResMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [detailsList, setDetailsList] = useState([]); // all details list
  const [details, setDetails] = useState([]); // selected details name array

  // Step 1: get all details  list
  useEffect(() => {
    listAllDetails().then((response) => {
      setDetailsList(response.data.details);
    });
  }, []);

  // Step 2: map all current details into selected array
  useEffect(() => {
    const array = [];
    if (childCategory && childCategory.details) {
      childCategory.details.map((detail) => array.push(detail.name));
      setDetails(array);
    }
  }, [childCategory]);

  // console.log('detailList', detailList);
  // console.log('childCategory', childCategory);
  // console.log('details', details);

  // Step 3: checkbox items change handle
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      if (!details.includes(e.target.value)) {
        setDetails([...details, e.target.value]);
      }
    } else {
      var filteredDetails = details.filter(
        (value, index, arr) => value !== e.target.value
      );
      setDetails(filteredDetails);
    }
  };

  // Step 4: update detail on submit
  const handleUpdateDetail = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await adminUpdateChildCategoryDetails(
      childCategory.id,
      details
    );
    // console.log(response);
    const { data, statusText } = response;
    setResStatus(statusText);
    setResMessage(data.message);

    setLoading(false);
  };

  return (
    <div className='shadow rounded border p-4 relative'>
      <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
        Choose applicable details for child category
      </div>
      <form
        onSubmit={handleUpdateDetail}
        className='pt-2 h-full space-y-4 flex flex-col justify-between'
      >
        <div className='flex flex-col flex-wrap'>
          {detailsList &&
            detailsList.map((detail) => (
              <div key={detail.id} className='flex items-center'>
                <input
                  type='checkbox'
                  id={detail.id}
                  value={detail.name}
                  onChange={handleCheckboxChange}
                  checked={details.includes(detail.name)}
                />
                <label htmlFor={detail.id} className='ml-2 cursor-pointer'>
                  {detail.name}
                </label>
              </div>
            ))}
        </div>
        {loading ? (
          <LoadingButton
            className='bg-violet-50 text-violet-700 border border-violet-700 
                hover:bg-violet-100'
          />
        ) : (
          <Button className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Update child category details
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditChildCatDetails;
