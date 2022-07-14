import { useEffect, useState } from 'react';
import { showSimilarProducts } from '../../../apis/products.apis';

const SimilarProducts = ({ name, orgName }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  // console.log('orgName: ', orgName);

  // Step 1: Search similar products using useEffect with 500 mili sec delay
  useEffect(() => {
    if (name === '' || name === orgName) {
      setSimilarProducts([]);
      return;
    }
    const delayedResponse = setTimeout(async () => {
      const response = await showSimilarProducts(name);
      setSimilarProducts(response.data.products);
    }, 500);

    return () => clearTimeout(delayedResponse);
  }, [name, orgName]);

  return (
    <div>
      <h4 className='text-sm font-semibold text-gray-600'>
        Similar products found:
      </h4>
      <ul className='flex'>
        {similarProducts &&
          similarProducts.map((product) => (
            <li
              key={product.id}
              className='px-2 py-1 border rounded bg-gray-50 border-gray-300 shadow text-xs text-gray-600'
            >
              {product.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SimilarProducts;
