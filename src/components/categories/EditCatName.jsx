import { useEffect } from 'react';
import { useState } from 'react';
import {
  showSimilarCategories,
  adminUpdateCategoryNameById,
} from '../../apis/categories.apis';
import SimilarNames from '../common/SimilarNames';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';

const EditCatName = ({
  categoryId,
  orgName,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
}) => {
  const [catName, setCatName] = useState(''); // only category name
  const [similarCategories, setSimilarCategories] = useState([]);

  // Step 1: Update category name
  useEffect(() => {
    if (orgName) {
      setCatName(orgName);
    }
  }, [orgName]);

  // Step 2: Search similar categories using useEffect with 500 mili sec delay
  useEffect(() => {
    if (catName === '' || catName === orgName) {
      setSimilarCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarCategories(catName);
      setSimilarCategories(response.data.categories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [catName, orgName]);

  const handleUpdateCategoryName = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminUpdateCategoryNameById(categoryId, catName);
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    if (data.success) {
      setCatName('');
      setSimilarCategories([]);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleUpdateCategoryName}
        className='grid md:grid-cols-2 gap-4 mt-2'
      >
        <FormInput
          label='Category name'
          id='category'
          type='text'
          placeholder='Enter category name'
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Update category name
          </Button>
        )}
      </form>
      <SimilarNames
        label='Similar categories found:'
        array={similarCategories}
      />
    </div>
  );
};

export default EditCatName;
