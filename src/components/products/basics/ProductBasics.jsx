import React from 'react';
import FormInput from '../../formComponents/FormInput';
import SimilarProducts from './SimilarProducts';

const ProductBasics = ({
  product,
  name,
  setName,
  description,
  setDescription,
}) => {
  return (
    <div className='space-y-4'>
      <h4 className='text-sm font-semibold text-gray-600'>
        {product
          ? 'Update product name and description'
          : 'Add your product name and description and click save'}
      </h4>
      <FormInput
        label='Product name'
        id='product'
        type='text'
        placeholder='Enter product name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SimilarProducts
        name={name ? name : ''}
        orgName={product ? product.name : ''}
      />
      <input
        type='text'
        value={description ? description : ''}
        setValue={setDescription}
        placeholder='Describe this product option in 2-3 lines'
      />
    </div>
  );
};

export default ProductBasics;
