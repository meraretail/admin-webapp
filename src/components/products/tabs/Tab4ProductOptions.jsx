import { useState } from 'react';
import parse from 'html-react-parser';
import PdtOptNameDesc from '../basics/PdtOptNameDesc';
import { adminUpdateProductOptionDataById } from '../../../apis/product.apis';

const Tab4ProductOptions = ({
  product,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  optionsData,
  rerender,
  setRerender,
}) => {
  // console.log('optionsData', optionsData);

  /********* PRODUCT OPTION RELATED STATES *********/
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedVariationOption, setSelectedVariationOption] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // handle submit attributes
  const handleOptionCustomData = async (event, productOptionId) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminUpdateProductOptionDataById(
      productOptionId,
      name,
      description
    );
    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    if (product) {
      setRerender(!rerender);
    }
  };

  return (
    <div className='space-y-4'>
      <PdtOptNameDesc
        loading={loading}
        rerender={rerender}
        product={product}
        optionsData={optionsData}
        selectedVariation={selectedVariation}
        setSelectedVariation={setSelectedVariation}
        selectedVariationOption={selectedVariationOption}
        setSelectedVariationOption={setSelectedVariationOption}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        handleOptionCustomData={handleOptionCustomData}
      />

      <hr className='border border-gray-400' />
      <h4 className='pb-2 font-semibold text-purple-700'>
        Current uploaded custom name & description for product options
      </h4>
      <div className='space-y-4'>
        {product &&
          product.productOptions &&
          product.productOptions.length > 0 &&
          product.productOptions.map((item, index) => (
            <div key={index}>
              {item.productOptionSellers &&
                item.productOptionSellers[0].isOptionActive && (
                  <table className='w-full'>
                    <tbody>
                      <tr className='text-sm whitespace-nowrap'>
                        <td className='px-2 py-1 border border-blue-600 w-20'>
                          {item.variation && item.variation.name
                            ? item.variation.name
                            : ''}
                        </td>
                        <td className='px-2 py-1 border border-blue-600'>
                          {item.variationOption && item.variationOption.name
                            ? item.variationOption.name
                            : ''}
                        </td>
                      </tr>
                      <tr className='text-sm whitespace-nowrap'>
                        <td className='px-2 py-1 border border-blue-600'>
                          Name
                        </td>
                        <td className='px-2 py-1 border border-blue-600'>
                          {item && item.customName ? item.customName : ''}
                        </td>
                      </tr>
                      <tr className='text-sm whitespace-nowrap'>
                        <td className='px-2 py-1 border border-blue-600'>
                          Description
                        </td>
                        <td className='px-2 py-1 border border-blue-600 whitespace-normal'>
                          {item && item.customDesc
                            ? parse(item.customDesc.toString())
                            : ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tab4ProductOptions;
