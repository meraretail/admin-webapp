import React, { useState, useEffect } from 'react';
import Dropdown from '../../common/Dropdown';
import { listAllCategories } from '../../../apis/categories.apis';
import { listAllSubCategoriesForCategory } from '../../../apis/subcategories.apis';
import { listAllChildCategoriesForSubCategory } from '../../../apis/childcategories.apis';

const CategoryMap = ({
  heading,
  setResSuccess,
  setResMessage,
  selectedChildCategory,
  setSelectedChildCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [childCategoryList, setChildCategoryList] = useState([]);

  // Step 1: Set selected category, sub category and child category from product
  useEffect(() => {
    if (
      selectedChildCategory &&
      selectedChildCategory.subCategory &&
      selectedChildCategory.subCategory.category
    ) {
      setSelectedCategory(selectedChildCategory.subCategory.category);
      setSelectedSubCategory(selectedChildCategory.subCategory);
    }
  }, [selectedChildCategory]);

  // Step 2: Get all categories list to add sub category
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

  // Step 3: get all subcategories for selectedCategory if exists
  useEffect(() => {
    if (selectedCategory) {
      listAllSubCategoriesForCategory(selectedCategory.id)
        .then((response) => {
          setSubCategoryList(response.data.subCategories);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
    }
  }, [selectedCategory, setResMessage, setResSuccess]);

  // Step 4: get all childcategories for selectedSubCategory if exists
  useEffect(() => {
    if (selectedSubCategory) {
      listAllChildCategoriesForSubCategory(selectedSubCategory.id)
        .then((response) => {
          setChildCategoryList(response.data.childCategories);
        })
        .catch((error) => {
          setResSuccess(error.data.success);
          setResMessage(error.data.message);
        });
    }
  }, [selectedSubCategory, setResMessage, setResSuccess]);

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 items-center'>
      <h4 className='text-sm font-semibold text-gray-600'>{heading}</h4>
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
      <Dropdown
        list={childCategoryList}
        placeholder='Search child category'
        value={selectedChildCategory ? selectedChildCategory.name : ''}
        setSelectedItem={setSelectedChildCategory}
        className='w-full'
      />
    </div>
  );
};

export default CategoryMap;
