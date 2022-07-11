import React, { useEffect, useState } from 'react';
import { listAllCategories } from '../../apis/categories.apis';
import { listAllSubCategoriesForCategory } from '../../apis/subcategories.apis';
import {
  adminCreateChildCategory,
  showSimilarChildCategories,
} from '../../apis/childcategories.apis';
import Dropdown from '../common/Dropdown';
import ItemContainer from '../common/ItemContainer';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';
import SimilarNames from '../common/SimilarNames';

const NewChildCategory = ({
  subCategoryId,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState({});

  const [childCategory, setChildCategory] = useState('');
  const [similarChildCategories, setSimilarChildCategories] = useState([]);

  // Step 1: Get all categories list to add sub category
  useEffect(() => {
    listAllCategories()
      .then((response) => {
        setCategoryList(response.data.categories);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess, rerender]);

  // Step 1.1: Set selected category if subCategoryId is passed
  useEffect(() => {
    if (subCategoryId) {
      const selectedCategory = categoryList.find(
        (category) => category.id === subCategoryId.split('-')[0]
      );
      setSelectedCategory(selectedCategory);
    }
  }, [categoryList, subCategoryId]);

  // step 2: get all subcategories for selectedCategory if exists
  useEffect(() => {
    if (selectedCategory) {
      listAllSubCategoriesForCategory(selectedCategory.id)
        .then((response) => {
          // console.log(response.data);
          setSubCategoryList(response.data.subCategories);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
    } else {
      setSubCategoryList([]);
    }
  }, [selectedCategory, setResMessage, setResSuccess]);

  // Step 3: Search similar child categories using useEffect with 500ms delay
  useEffect(() => {
    if (childCategory === '') {
      setSimilarChildCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarChildCategories(childCategory);
      setSimilarChildCategories(response.data.childCategories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [childCategory]);

  // Step 4: Add new child category
  const handleAddChildCategory = async (event) => {
    event.preventDefault();
    if (
      selectedCategory.id === undefined ||
      selectedCategory.id === '' ||
      selectedSubCategory.id === undefined ||
      selectedSubCategory.id === ''
    ) {
      setResSuccess(false);
      setResMessage(
        'Please select category and sub category to create childcategory!'
      );
      return;
    }
    setLoading(true);
    // console.log(childCategory, selectedSubCategory.id);
    const { data } = await adminCreateChildCategory(
      childCategory,
      selectedSubCategory.id
    );
    setLoading(false);

    setResSuccess(data.success);
    setResMessage(data.message);
    if (data.success) {
      setChildCategory('');
      setRerender(!rerender);
    }
  };

  return (
    <ItemContainer title='Create new childcategory'>
      {/* choose category to start */}
      <div>
        <h4 className='text-sm font-semibold mb-2 text-gray-600'>
          Choose category and then sub category to create child category
        </h4>
        <div className='flex gap-4'>
          <Dropdown
            list={categoryList}
            placeholder='Search category'
            value={selectedCategory ? selectedCategory.name : ''}
            setSelectedItem={setSelectedCategory}
            className='w-full'
          />
          <Dropdown
            list={subCategoryList}
            placeholder='Search sub category'
            value={selectedSubCategory ? selectedSubCategory.name : ''}
            setSelectedItem={setSelectedSubCategory}
            className='w-full'
          />
        </div>
      </div>
      {/* choose category to start ends */}

      {/* add new child category */}
      <div>
        <form
          onSubmit={handleAddChildCategory}
          className='grid md:grid-cols-2 gap-4 mt-4'
        >
          <FormInput
            label='Child category name'
            id='childCategory'
            type='text'
            placeholder='Enter child category name'
            value={childCategory}
            onChange={(e) => setChildCategory(e.target.value)}
          />
          {loading ? (
            <LoadingButton />
          ) : (
            <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
              Create new child category
            </Button>
          )}
        </form>
        {/* similar sub categories found */}
        <SimilarNames
          label='Similar child categories found:'
          array={similarChildCategories}
        />
        {/* similar sub categories found ends */}
      </div>
    </ItemContainer>
  );
};

export default NewChildCategory;
