import React, { useEffect, useState } from 'react';
import Button from '../formComponents/Button';
import LoadingButton from '../formComponents/LoadingButton';
import { listAllVariations } from '../../apis/variations.apis';
import { adminUpdateChildCategoryVariations } from '../../apis/childcategories.apis';

const EditChildCatVariations = ({
  childCategory,
  setResSuccess,
  setResMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [variationsList, setVariationsList] = useState([]); // all variations list
  const [variations, setVariations] = useState([]); // selected variations name array

  // Step 1: get all variations  list
  useEffect(() => {
    listAllVariations()
      .then((response) => {
        setVariationsList(response.data.variations);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess]);

  // Step 2: map all current variations into selected array
  useEffect(() => {
    const array = [];
    if (childCategory && childCategory.variations) {
      childCategory.variations.map((variation) => array.push(variation.name));
      setVariations(array);
    }
  }, [childCategory]);

  // console.log('variationList', variationList);
  // console.log('Subcategory', subCategory);
  // console.log('variations', variations);

  // Step 3: checkbox items change handle
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      if (!variations.includes(e.target.value)) {
        setVariations([...variations, e.target.value]);
      }
    } else {
      var filteredVariations = variations.filter(
        (value, index, arr) => value !== e.target.value
      );
      setVariations(filteredVariations);
    }
  };

  // Step 4: update variation on submit
  const handleUpdateVariation = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminUpdateChildCategoryVariations(
      childCategory.id,
      variations
    );
    setLoading(false);

    setResSuccess(data.success);
    setResMessage(data.message);
  };

  return (
    <div className='shadow rounded border p-4 relative'>
      <div className='absolute -top-3 left-2 px-2 bg-white text-violet-700'>
        Choose applicable variations for child category
      </div>
      <form
        onSubmit={handleUpdateVariation}
        className='pt-2 h-full space-y-4 flex flex-col justify-between'
      >
        <div className='flex flex-col flex-wrap'>
          {variationsList &&
            variationsList.map((variation) => (
              <div key={variation.id} className='flex items-center'>
                <input
                  type='checkbox'
                  id={variation.id}
                  value={variation.name}
                  onChange={handleCheckboxChange}
                  checked={variations.includes(variation.name)}
                />
                <label htmlFor={variation.id} className='ml-2 cursor-pointer'>
                  {variation.name}
                </label>
              </div>
            ))}
        </div>
        {loading ? (
          <LoadingButton className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100' />
        ) : (
          <Button className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Update child category variations
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditChildCatVariations;
