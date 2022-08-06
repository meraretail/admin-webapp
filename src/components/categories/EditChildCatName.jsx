import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ItemContainer from '../common/ItemContainer';
import SimilarNames from '../common/SimilarNames';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';
import { showSimilarChildCategories } from '../../apis/product.apis';

const EditChildCatName = ({
  childCategory,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [similarChildCategories, setSimilarChildCategories] = useState([]);

  // Step 1: Update sub category name
  useEffect(() => {
    if (childCategory) {
      setName(childCategory.name);
    }
  }, [childCategory]);

  // Step 2: Search similar child categories using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '' || name === childCategory.name) {
      setSimilarChildCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarChildCategories(name);
      setSimilarChildCategories(response.data.childCategories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [name, childCategory]);

  // Step 3: Update sub category
  const handleUpdateChildCatName = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'PUT',
        url: `/api/product/admin/update-childcategory/${childCategory.id}`,
        data: { name: name },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setName('');
        setSimilarChildCategories([]);
        setRerender(!rerender);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
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
