import { useState, useEffect } from 'react';
import Button from '../../formComponents/Button';
import LoadingButton from '../../formComponents/LoadingButton';
import ProductVariations from '../attributes/ProductVariations';
import ProductInvPrice from '../imageStockPrice/ProductInvPrice';
import { productTabs } from '../../../listItems/productItems/productTabs';
import { adminUpdateProductVariationsSkusStocksPricesById } from '../../../apis/products.apis';
import { generateSkuFromProductAndVariation } from '../../../utils/sku.utils';

const Tab2ProductVariations = ({
  product,
  activeId,
  setActiveId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  rerender,
  setRerender,
  parameters,
}) => {
  // const navigate = useNavigate();
  // console.log('parameters', parameters);
  // console.log('product', product);

  /********** PRODUCT VARIATIONS STATE AND SKUS **********/
  const [variationData, setVariationData] = useState([]);
  const [skus, setSkus] = useState([]);
  const [maxRetailPrice, setMaxRetailPrice] = useState(0);
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [defaultStock, setDefaultStock] = useState(0);

  /*** Step 1: Map variations and product variations in variation Data */
  useEffect(() => {
    if (parameters) {
      const variations = parameters.childCategory.variations;
      setVariationData(
        variations.map((variation) => ({
          id: variation.id,
          name: variation.name,
          variesImage: variation.variesImage,
          options: variation.variationOptions,
          selectedOptions:
            product &&
            product.productVariations &&
            product.productVariations.length > 0
              ? product.productVariations
                  .filter(
                    (productVariation) =>
                      productVariation.variation.id === variation.id
                  )
                  .map((productVariation) => productVariation.variationOption)
              : variation.variationOptions,
        }))
      );
    }
  }, [parameters, product]);

  useEffect(() => {
    if (product) {
      setMaxRetailPrice(product.maxRetailPrice ? product.maxRetailPrice : 0);
      setDefaultPrice(product.defaultPrice ? product.defaultPrice : 0);
      setDefaultStock(product.defaultStock ? product.defaultStock : 0);
    }
  }, [product, setDefaultPrice, setDefaultStock]);

  // Generate SKUs from variationData and save in skus
  useEffect(() => {
    if (variationData.length > 0) {
      const skuArray = generateSkuFromProductAndVariation(
        product,
        variationData
      );
      // update price and stock in skuArray from product
      skuArray &&
        skuArray.forEach((sku) => {
          const productSku = product.skus.find(
            (productSku) => productSku.skuName === sku.skuName
          );
          sku.mrp = productSku ? productSku.currentMRP : product.maxRetailPrice;
          sku.price = productSku
            ? productSku.currentPrice
            : product.defaultPrice;
          sku.stock = productSku ? productSku.currentStock : 0;
        });
      setSkus(skuArray);
    }
  }, [product, variationData]);

  // console.log('variationData', variationData);
  // console.log('skus', skus);

  const handleSubmitVariations = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await adminUpdateProductVariationsSkusStocksPricesById(
      product.id,
      variationData,
      maxRetailPrice,
      defaultPrice,
      defaultStock,
      skus
    );
    setLoading(false);

    setResSuccess(data.success);
    setResMessage(data.message);

    // Handle next steps
    if (data.success) {
      if (activeId < productTabs.length) {
        setActiveId(activeId + 1);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitVariations}>
        <div className='space-y-4 pb-2'>
          <ProductVariations
            className=''
            variationData={variationData}
            setVariationData={setVariationData}
          />
          <ProductInvPrice
            className=''
            product={product}
            skus={skus}
            setSkus={setSkus}
            maxRetailPrice={maxRetailPrice}
            setMaxRetailPrice={setMaxRetailPrice}
            defaultPrice={defaultPrice}
            setDefaultPrice={setDefaultPrice}
            defaultStock={defaultStock}
            setDefaultStock={setDefaultStock}
          />
          {loading ? (
            <LoadingButton className='bg-blue-50 text-blue-700 border border-blue-700 hover:bg-blue-100' />
          ) : (
            <Button
              text='UPDATE PRODUCT VARIATIONS, AVAILABLE STOCKS AND PRICES'
              className='opacity-70 py-2 tracking-wider bg-blue-50 text-blue-700 border border-blue-700 hover:bg-blue-100'
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Tab2ProductVariations;
