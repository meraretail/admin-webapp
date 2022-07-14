import Button from '../../formComponents/Button';
import DefPriceStockInput from './DefPriceStockInput';
import { pdtStockPriceTable } from '../../../listItems/productItems/pdtStockPriceTable';

const ProductInvPrice = ({
  className,
  product,
  skus,
  setSkus,
  maxRetailPrice,
  setMaxRetailPrice,
  defaultPrice,
  setDefaultPrice,
  defaultStock,
  setDefaultStock,
}) => {
  // console.log('product', product);
  // console.log('skus', skus);
  // console.log('defaultPrice', defaultPrice);
  // console.log('defaultStock', defaultStock);

  const handleAllMRPUpdate = () => {
    // setSkus: price = defaultPrice for all items
    setSkus(
      skus.map((sku) => {
        return { ...sku, mrp: maxRetailPrice };
      })
    );
  };

  const handleAllPriceUpdate = () => {
    // setSkus: price = defaultPrice for all items
    setSkus(
      skus.map((sku) => {
        return { ...sku, price: defaultPrice };
      })
    );
  };

  const handleAllStockUpdate = () => {
    // setSkus: stock = defaultStock for all items
    setSkus(
      skus.map((sku) => {
        return { ...sku, stock: defaultStock };
      })
    );
  };

  return (
    <div className={`${className} space-y-4`}>
      <h4 className='text-sm font-semibold text-gray-600'>
        Update product base price
      </h4>
      <DefPriceStockInput
        product={product}
        maxRetailPrice={maxRetailPrice}
        setMaxRetailPrice={setMaxRetailPrice}
        defaultPrice={defaultPrice}
        setDefaultPrice={setDefaultPrice}
        defaultStock={defaultStock}
        setDefaultStock={setDefaultStock}
      />
      <h4 className='text-sm font-semibold text-gray-600'>
        Update available stock and price for each variation
      </h4>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Button
          text='Update all sku mrp to base mrp'
          className='opacity-90 text-xs py-2 tracking-wider bg-gray-50 text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white'
          onClick={handleAllMRPUpdate}
          type='button'
        />
        <Button
          text='Update all sku prices to base price'
          className='opacity-90 text-xs py-2 tracking-wider bg-gray-50 text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white'
          onClick={handleAllPriceUpdate}
          type='button'
        />
        <Button
          text='Update all sku stocks to default stock'
          className='opacity-90 text-xs py-2 tracking-wider bg-gray-50 text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white'
          onClick={handleAllStockUpdate}
          type='button'
        />
      </div>
      <table className='w-full'>
        <thead>
          <tr className='text-sm whitespace-nowrap'>
            {pdtStockPriceTable.map((item) => (
              <th key={item.id} className='px-2 py-1 border border-blue-600'>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skus &&
            skus.map((sku, skuIndex) => (
              <tr key={skuIndex} className='text-sm whitespace-nowrap'>
                <td className='px-2 py-1 border border-blue-600'>
                  {sku.sellerString}
                </td>
                <td className='px-2 py-1 border border-blue-600'>
                  {sku.skuName}
                </td>
                <td className='px-2 py-1 border border-blue-600'>
                  <input
                    type='text'
                    name='mrp'
                    placeholder='₹ 0.00'
                    className='w-full focus:outline-none text-center'
                    value={sku.mrp ? sku.mrp : 0}
                    // on Change, set skuPrice where skuName is equal to sku.skuName
                    onChange={(e) => {
                      const newSkus = [...skus];
                      newSkus[skuIndex].mrp = e.target.value;
                      setSkus(newSkus);
                    }}
                  />
                </td>
                <td className='px-2 py-1 border border-blue-600'>
                  <input
                    type='text'
                    name='price'
                    placeholder='₹ 0.00'
                    className='w-full focus:outline-none text-center'
                    value={sku.price ? sku.price : 0}
                    // on Change, set skuPrice where skuName is equal to sku.skuName
                    onChange={(e) => {
                      const newSkus = [...skus];
                      newSkus[skuIndex].price = e.target.value;
                      setSkus(newSkus);
                    }}
                  />
                </td>
                <td className='px-2 py-1 border border-blue-600'>
                  <input
                    type='text'
                    name='stock'
                    placeholder='0'
                    className='w-full focus:outline-none text-center'
                    value={sku.stock ? sku.stock : 0}
                    onChange={(e) => {
                      const newSkus = [...skus];
                      newSkus[skuIndex].stock = e.target.value;
                      setSkus(newSkus);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductInvPrice;
