import { useEffect, useState } from 'react';
import Button from '../formComponents/Button';
import LoadingButton from '../formComponents/LoadingButton';
import { listAllFeatures } from '../../apis/product.apis';
import { adminUpdateChildCategoryFeatures } from '../../apis/childcategories.apis';

const EditChildCatFeatures = ({
  childCategory,
  setResStatus,
  setResMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [featuresList, setFeaturesList] = useState([]); // all features list
  const [features, setFeatures] = useState([]); // selected features

  // Step 1: get all features  list
  useEffect(() => {
    listAllFeatures().then((response) => {
      setFeaturesList(response.data.features);
    });
  }, []);

  // Step 2: map all current features into selected features array
  useEffect(() => {
    const array = [];
    if (childCategory && childCategory.features) {
      childCategory.features.map((feature) => array.push(feature.name));
      setFeatures(array);
    }
  }, [childCategory]);

  // console.log('featuresList', featuresList);
  // console.log('childCategory', childCategory);
  // console.log('features', features);

  // Step 3: checkbox items change handle
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      if (!features.includes(e.target.value)) {
        setFeatures([...features, e.target.value]);
      }
    } else {
      var filteredFeatures = features.filter(
        (value, index, arr) => value !== e.target.value
      );
      setFeatures(filteredFeatures);
    }
  };

  // Step 4: update features on submit
  const handleUpdateFeatures = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, statusText } = await adminUpdateChildCategoryFeatures(
      childCategory.id,
      features
    );
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);
  };

  // console.log(features);
  return (
    <div className='shadow rounded border p-4 relative'>
      <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
        Choose applicable features for child category
      </div>
      <form
        onSubmit={handleUpdateFeatures}
        className='pt-2 h-full space-y-4 flex flex-col justify-between'
      >
        <div className='flex flex-col flex-wrap'>
          {featuresList &&
            featuresList.length > 0 &&
            featuresList.map((feature) => (
              <div key={feature.id} className='flex items-center'>
                <input
                  type='checkbox'
                  id={feature.id}
                  value={feature.name}
                  onChange={handleCheckboxChange}
                  checked={features.includes(feature.name)}
                />
                <label htmlFor={feature.id} className='ml-2 cursor-pointer'>
                  {feature.name}
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
            Update child category features
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditChildCatFeatures;
