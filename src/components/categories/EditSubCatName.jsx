import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ItemContainer from '../common/ItemContainer';
import SimilarNames from '../common/SimilarNames';
import Button from '../formComponents/Button';
import FormInput from '../formComponents/FormInput';
import LoadingButton from '../formComponents/LoadingButton';
import { showSimilarSubCategories } from '../../apis/product.apis';

const EditSubCatName = ({
  subCategory,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [similarSubCategories, setSimilarSubCategories] = useState([]);

  // Step 1: Update sub category name
  useEffect(() => {
    if (subCategory) {
      setName(subCategory.name);
    }
  }, [subCategory]);

  // Step 2: Search similar sub categories using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '' || name === subCategory.name) {
      setSimilarSubCategories([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarSubCategories(name);
      setSimilarSubCategories(response.data.subCategories);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [name, subCategory]);

  // Step 3: Update sub category
  const handleUpdateSubCatName = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'put',
        url: `/api/product/admin/update-subcategory/${subCategory.id}`,
        data: { name: name },
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
      if (response.data.success) {
        setName('');
        setSimilarSubCategories([]);
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
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
