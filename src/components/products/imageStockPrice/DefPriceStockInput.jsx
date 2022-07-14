import React from 'react';

const DefPriceStockInput = ({
  product,
  maxRetailPrice,
  setMaxRetailPrice,
  defaultPrice,
  setDefaultPrice,
  defaultStock,
  setDefaultStock,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-sm whitespace-nowrap">
          <th className="px-2 py-1 border border-blue-600">Product Name</th>
          <th className="px-2 py-1 border border-blue-600">Base MRP (₹)</th>
          <th className="px-2 py-1 border border-blue-600">
            Base selling price (₹)
          </th>
          <th className="px-2 py-1 border border-blue-600">
            Default stock quantity
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-sm whitespace-nowrap">
          <td className="px-2 py-1 border border-blue-600">
            {product ? product.name : ''}
          </td>
          <td className="px-2 py-1 border border-blue-600">
            <input
              type="number"
              name="mrp"
              placeholder="₹ 0.00"
              className="w-full focus:outline-none text-center"
              value={maxRetailPrice ? maxRetailPrice : 0}
              onChange={(e) => {
                setMaxRetailPrice(e.target.value);
              }}
            />
          </td>
          <td className="px-2 py-1 border border-blue-600">
            <input
              type="number"
              name="price"
              placeholder="₹ 0.00"
              className="w-full focus:outline-none text-center"
              value={defaultPrice ? defaultPrice : 0}
              onChange={(e) => {
                setDefaultPrice(e.target.value);
              }}
            />
          </td>
          <td className="px-2 py-1 border border-blue-600">
            <input
              type="number"
              name="stock"
              placeholder="0"
              className="w-full focus:outline-none text-center"
              value={defaultStock ? defaultStock : 0}
              onChange={(e) => {
                setDefaultStock(e.target.value);
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DefPriceStockInput;
