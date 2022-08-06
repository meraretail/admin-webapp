import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Dropdown from '../common/Dropdown';
import ItemContainer from '../common/ItemContainer';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';
import SimilarNames from '../common/SimilarNames';
import { listAllCategories } from '../../apis/product.apis';
import { listAllSubCategoriesForCategory } from '../../apis/product.apis';
import { showSimilarChildCategories } from '../../apis/product.apis';

const NewChildCategory = ({
  subCategory,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();
  // console.log('subCategory', subCategory);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

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
  }, [setResMessage, setResSuccess]);

  // step 2: get all subcategories for selectedCategory if exists
  useEffect(() => {
    listAllSubCategoriesForCategory(
      selectedCategory?.id ? selectedCategory?.id : subCategory?.categoryId
    )
      .then((response) => {
        // console.log(response.data);
        setSubCategoryList(response.data.subCategories);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [selectedCategory, subCategory, setResMessage, setResSuccess]);

  // Step 3: Set selected category and subcategory from initial data
  useEffect(() => {
    if (subCategory) {
      const selectedCategory = categoryList.find(
        (category) => category.id === subCategory.categoryId
      );
      setSelectedCategory(selectedCategory);
    }
  }, [categoryList, subCategory]);

  useEffect(() => {
    if (subCategory) {
      const selectedSubCategory = subCategoryList.find(
        (subCat) => subCat.id === subCategory.id
      );
      setSelectedSubCategory(selectedSubCategory);
    }
  }, [subCategoryList, subCategory]);

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
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: '/api/product/admin/create-childcategory',
        data: { name: childCategory, subCategoryId: selectedSubCategory.id },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setChildCategory('');
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
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
