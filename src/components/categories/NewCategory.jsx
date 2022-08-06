import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ItemContainer from '../common/ItemContainer';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';
import SimilarNames from '../common/SimilarNames';
import { showSimilarCategories } from '../../apis/product.apis';

const NewCategory = ({
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [similarCategories, setSimilarCategories] = useState([]);
  const [category, setCategory] = useState('');

  // Step 1: Search similar categories using useEffect with 500 ms delay
  useEffect(() => {
    if (category === '') {
      setSimilarCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarCategories(category);
      setSimilarCategories(response.data.categories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [category]);

  // Step 2: Add new category
  const handleAddCategory = async (event) => {
    event.preventDefault();
    if (category === '') {
      setResSuccess(false);
      setResMessage('Please enter a category name!');
      return;
    }
    setLoading(true);
    try {
      const response = await axiosPrivate.post(
        '/api/product/admin/create-category',
        JSON.stringify({
          name: category,
        })
      );

      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setCategory('');
        setRerender(!rerender);
      }
    } catch (error) {
      setResSuccess(false);
      setResMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <ItemContainer title='Create new category'>
      <form
        onSubmit={handleAddCategory}
        className='grid md:grid-cols-2 gap-4 mt-2'
      >
        <FormInput
          label='Category name'
          id='category'
          type='text'
          placeholder='Enter category name'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Create new category
          </Button>
        )}
      </form>
      {/* similar categories found */}
      <SimilarNames
        label='Similar category names found:'
        array={similarCategories}
      />
      {/* similar categories found ends */}
    </ItemContainer>
  );
};

export default NewCategory;
