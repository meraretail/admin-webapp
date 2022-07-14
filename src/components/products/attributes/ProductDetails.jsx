import React from 'react';

const ProductDetails = ({ className, detailData, setDetailData }) => {
  // console.log('detailData', detailData);

  // handle input change
  const handleInputChange = (event, detailIndex) => {
    setDetailData((prevState) => {
      return [
        ...prevState.slice(0, detailIndex),
        {
          ...prevState[detailIndex],
          value: event.target.value,
        },
        ...prevState.slice(detailIndex + 1),
      ];
    });
  };

  return (
    <div className={`${className} space-y-4`}>
      <h4 className="text-sm font-semibold text-gray-600">
        Edit product details
      </h4>
      <table className="w-full">
        <thead>
          <tr className="text-sm">
            <th className="px-2 py-1 border border-blue-600 w-32 text-left">
              Detail
            </th>
            <th className="px-2 py-1 border border-blue-600 text-left">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {detailData &&
            detailData.map((detail, detailIndex) => (
              <tr key={detailIndex} className="text-sm">
                <td className="px-2 py-1 border border-blue-600">
                  {detail.name}
                </td>
                <td className="border border-blue-600">
                  <input
                    type="text"
                    className="w-full outline-none px-2 py-1"
                    value={
                      detailData[detailIndex].value
                        ? detailData[detailIndex].value
                        : ''
                    }
                    onChange={(event) => handleInputChange(event, detailIndex)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
