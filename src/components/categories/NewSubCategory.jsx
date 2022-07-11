import { useEffect, useState } from 'react';
import { listAllCategories } from '../../apis/categories.apis';
import {
  adminCreateSubCategory,
  showSimilarSubCategories,
} from '../../apis/subcategories.apis';
import Dropdown from '../common/Dropdown';
import ItemContainer from '../common/ItemContainer';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';
import SimilarNames from '../common/SimilarNames';

const NewSubCategory = ({
  category,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: '',
  });
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState('');
  const [similarSubCategories, setSimilarSubCategories] = useState([]);

  // Step 1: Get all categories list to add sub category
  useEffect(() => {
    listAllCategories()
      .then((response) => {
        // console.log(response.data);
        setCategoryList(response.data.categories);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess, rerender]);

  // Step 1.1: If category exists, set selectedCategory to it
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  // Step 2: Search similar sub categories using useEffect with 500ms delay
  useEffect(() => {
    if (subCategory === '') {
      setSimilarSubCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarSubCategories(subCategory);
      setSimilarSubCategories(response.data.subCategories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [subCategory]);

  // Step 3: Add new sub category
  const handleAddSubCategory = async (event) => {
    event.preventDefault();
    if (selectedCategory.id === '') {
      setResSuccess(false);
      setResMessage('Please select a category to create new subcategory!');
      return;
    }
    setLoading(true);
    const { data } = await adminCreateSubCategory(
      subCategory,
      selectedCategory.id
    );
    setLoading(false);

    setResSuccess(data.success);
    setResMessage(data.message);
    if (data.success) {
      setSubCategory('');
      setRerender(!rerender);
    }
  };

  // console.log('categoryList: ', categoryList);

  return (
    <ItemContainer title='Create new subcategory'>
      {/* choose category to start */}
      <div className='space-y-4'>
        <div className='grid md:grid-cols-2 gap-4 items-center'>
          <h4 className='text-gray-600 pl-1'>
            Choose category to create sub category:
          </h4>
          <div className='w-full'>
            <Dropdown
              list={categoryList}
              placeholder='Choose category or type to search'
              value={selectedCategory ? selectedCategory.name : ''}
              setSelectedItem={setSelectedCategory}
              className='w-full'
              inputClassname='placeholder:text-sm'
            />
          </div>
        </div>

        <form
          onSubmit={handleAddSubCategory}
          className='grid md:grid-cols-2 gap-4'
        >
          <FormInput
            label='Sub category name'
            id='subCategory'
            type='text'
            placeholder='Enter sub category name'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
          {loading ? (
            <LoadingButton />
          ) : (
            <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
              Create new sub category
            </Button>
          )}
        </form>

        <SimilarNames
          label='Similar sub categories found:'
          array={similarSubCategories}
        />
      </div>
    </ItemContainer>
  );
};

export default NewSubCategory;
