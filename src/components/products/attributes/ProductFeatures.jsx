import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';

const ProductFeatures = ({ className, featureData, setFeatureData }) => {
  const navigate = useNavigate();
  // console.log('featureData', featureData);

  /** STEP 2: handle selection change **/
  const handleSelectionChange = (event, feature, index) => {
    const selectedOption = feature.options.find(
      (option) => option.name === event.target.value
    );
    setFeatureData((prevState) => {
      return [
        ...prevState.slice(0, index),
        { ...prevState[index], selectedOption },
        ...prevState.slice(index + 1),
      ];
    });
  };

  /** STEP 3: handle add feature option **/
  const handleAddOption = (id) => {
    navigate(`/feature/${id}`);
  };

  return (
    <div className={`${className} space-y-4`}>
      <h4 className="text-sm font-semibold text-gray-600">
        Select product features
      </h4>
      <table className="w-full">
        <thead>
          <tr className="text-sm whitespace-nowrap">
            <th className="px-2 py-1 border border-blue-600 w-32 text-left">
              Feature
            </th>
            <th className="px-2 py-1 border border-blue-600 text-left">
              Options
            </th>
            <th className="px-2 py-1 border border-blue-600 w-28 text-left">
              Add new option
            </th>
          </tr>
        </thead>
        <tbody>
          {featureData.map((feature, index) => (
            <tr key={index} className="text-sm">
              <td className="px-2 py-1 border border-blue-600">
                {feature.name}
              </td>
              <td className="px-2 py-1 border border-blue-600">
                {/* get user input from options and set it to selectedOption */}
                {/* set select option from selectedOption */}
                <select
                  className="w-full outline-none"
                  value={
                    feature && feature.selectedOption
                      ? feature.selectedOption.name
                      : ''
                  }
                  onChange={(event) =>
                    handleSelectionChange(event, feature, index)
                  }
                >
                  {feature.options.map((option) => (
                    <option
                      key={option.id}
                      value={option.name}
                      className="w-full block"
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-2 py-1 border border-blue-600">
                <button
                  className="flex items-center font-semibold px-1 py-0.5 opacity-70 
                          bg-green-50 text-green-700 border border-green-700 
                          hover:bg-green-100 rounded mx-auto"
                  onClick={() => handleAddOption(feature.id)}
                >
                  <MdPostAdd />
                  <span className="ml-1">Add</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductFeatures;
