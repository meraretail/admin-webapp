import React from 'react';

const ExcelDataPreview = ({ uploadedExcelData }) => {
  return (
    <div className="border rounded shadow p-4">
      <table className="w-full">
        <thead>
          <tr className="bg-purple-50">
            <th className="border px-2 py-1 text-left text-sm whitespace-nowrap border-purple-300">
              Child Category
            </th>
            <th className="border px-2 py-1 text-left text-sm whitespace-nowrap border-purple-300">
              Brand Name
            </th>
            <th className="border px-2 py-1 text-left text-sm whitespace-nowrap border-purple-300">
              Product Name
            </th>
            <th className="border px-2 py-1 text-left text-sm whitespace-nowrap border-purple-300">
              Product Description
            </th>
            <th className="border px-2 py-1 text-left text-sm whitespace-nowrap border-purple-300">
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {uploadedExcelData.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="border px-2 py-1 text-sm">
                {/* remove space from name */}
                {item.childCategory.replace(/\s+$/, '')}
              </td>
              <td className="border px-2 py-1 text-sm">
                {item.brandName.replace(/\s+$/, '')}
              </td>
              <td className="border px-2 py-1 text-sm">
                {item.productName.replace(/\s+$/, '')}
              </td>
              <td className="border px-2 py-1 text-sm">
                {item.productDescription.replace(/\s+$/, '')}
              </td>
              <td className="border px-2 py-1 text-sm">
                {item.mainCustomerGender.replace(/\s+$/, '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelDataPreview;
