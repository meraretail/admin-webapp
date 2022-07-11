import { useState, useEffect } from 'react';
import {
  showSimilarSubCategories,
  adminUpdateSubCategoryById,
} from '../../apis/subcategories.apis';
import ItemContainer from '../common/ItemContainer';
import SimilarNames from '../common/SimilarNames';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';

const EditSubCatName = ({ id, orgName, setResStatus, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [similarSubCategories, setSimilarSubCategories] = useState([]);

  // Step 1: Update sub category name
  useEffect(() => {
    if (orgName) {
      setName(orgName);
    }
  }, [orgName]);

  // Step 2: Search similar sub categories using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '' || name === orgName) {
      setSimilarSubCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarSubCategories(name);
      setSimilarSubCategories(response.data.subCategories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [name, orgName]);

  // Step 3: Update sub category
  const handleUpdateSubCatName = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, statusText } = await adminUpdateSubCategoryById(id, name);
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);

    if (statusText === 'OK') {
      setName('');
      setSimilarSubCategories([]);
    }
  };

  return (
    <ItemContainer title='Update sub category name'>
      <form
        onSubmit={handleUpdateSubCatName}
        className='grid md:grid-cols-2 gap-4 mt-2'
      >
        <FormInput
          label='Sub category name'
          id='subCategory'
          type='text'
          placeholder='Enter sub category name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Update sub category name
          </Button>
        )}
      </form>
      {/* similar categories found */}
      <SimilarNames
        label='Similar sub categories found:'
        array={similarSubCategories}
      />
      {/* similar categories found ends */}
    </ItemContainer>
  );
};

export default EditSubCatName;
