import { useState, useEffect } from 'react';
import {
  showSimilarChildCategories,
  adminUpdateChildCategoryById,
} from '../../apis/childcategories.apis';
import ItemContainer from '../common/ItemContainer';
import SimilarNames from '../common/SimilarNames';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';

const EditChildCatName = ({ id, orgName, setResStatus, setResMessage }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [similarChildCategories, setSimilarChildCategories] = useState([]);

  // Step 1: Update sub category name
  useEffect(() => {
    if (orgName) {
      setName(orgName);
    }
  }, [orgName]);

  // Step 2: Search similar child categories using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '' || name === orgName) {
      setSimilarChildCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarChildCategories(name);
      setSimilarChildCategories(response.data.childCategories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [name, orgName]);

  // Step 3: Update sub category
  const handleUpdateChildCatName = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, statusText } = await adminUpdateChildCategoryById(id, name);
    setResStatus(statusText);
    setResMessage(data.message);
    setLoading(false);

    if (statusText === 'OK') {
      setName('');
      setSimilarChildCategories([]);
    }
  };

  return (
    <ItemContainer title='Update child category name'>
      <form
        onSubmit={handleUpdateChildCatName}
        className='grid md:grid-cols-2 gap-4 mt-2'
      >
        <FormInput
          label='Child category name'
          id='childCategory'
          type='text'
          placeholder='Enter child category name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
            Update child category name
          </Button>
        )}
      </form>
      {/* similar categories found */}
      <SimilarNames
        label='Similar child categories found:'
        array={similarChildCategories}
      />
      {/* similar categories found ends */}
    </ItemContainer>
  );
};

export default EditChildCatName;
