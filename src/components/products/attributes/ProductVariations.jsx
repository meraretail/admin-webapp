import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';

const ProductVariations = ({ className, variationData, setVariationData }) => {
  const navigate = useNavigate();
  // console.log('variationData', variationData);

  // handle checkbox change
  const handleSelectedOption = (event, varIndex, option) => {
    event.target.checked
      ? setVariationData((prevState) => {
          const newState = [...prevState];
          newState[varIndex].selectedOptions.push(option);
          return newState;
        })
      : setVariationData((prevState) => {
          const newState = [...prevState];
          newState[varIndex].selectedOptions = newState[
            varIndex
          ].selectedOptions.filter((item) => item.name !== option.name);
          return newState;
        });
  };

  // handle add variation options
  const handleAddOption = (id) => {
    navigate(`/variation/${id}`);
  };

  return (
    <div className={`${className} space-y-4`}>
      <h4 className="text-sm font-semibold text-gray-600">
        Select available product variations
      </h4>
      <table className="w-full">
        <thead>
          <tr className="text-sm whitespace-nowrap">
            <th className="px-2 py-1 border border-blue-600 w-28">Variation</th>
            <th className="px-2 py-1 border border-blue-600">Options</th>
            <th className="px-2 py-1 border border-blue-600 w-40">
              Add new option
            </th>
          </tr>
        </thead>
        <tbody>
          {variationData &&
            variationData.map((variation, varIndex) => (
              <tr key={varIndex} className="text-sm">
                <td className="px-2 py-1 border border-blue-600">
                  {variation.name}
                </td>
                <td className="px-2 py-1 border border-blue-600">
                  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                    {/* populate checkboxes from options and save user input in selectedOptions */}
                    {variation.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="w-full flex items-center border-none"
                      >
                        <input
                          type="checkbox"
                          id={`${varIndex}-${optionIndex}`}
                          className="mr-2 outline-none border-none cursor-pointer"
                          checked={
                            variation.selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.id === option.id
                            )
                              ? true
                              : false
                          }
                          onChange={(event) =>
                            handleSelectedOption(event, varIndex, option)
                          }
                        />

                        <label
                          htmlFor={`${varIndex}-${optionIndex}`}
                          style={{ backgroundColor: option.value }}
                          className={`${
                            variation.name === 'Color' ? 'block' : 'hidden'
                          } w-4 h-4 rounded-full border cursor-pointer`}
                        ></label>
                        <label
                          htmlFor={`${varIndex}-${optionIndex}`}
                          className="mx-1 cursor-pointer"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-1 border border-blue-600">
                  <button
                    className="w-full flex items-center font-semibold px-1 py-0.5 opacity-70 
                          bg-green-50 text-green-700 border border-green-700 
                          hover:bg-green-100 rounded mx-auto"
                    onClick={() => handleAddOption(variation.id)}
                  >
                    <MdPostAdd />
                    <span className="ml-1">{`Add new ${variation.name}`}</span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductVariations;
