import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';

const ProductInfos = ({ className, informationData, setInformationData }) => {
  const navigate = useNavigate();
  // console.log('informationData', informationData);

  // include option data in selectedOptions if checkbox is checked, remove if unchecked
  const handleSelectedOption = (event, infoIndex, option) => {
    event.target.checked
      ? setInformationData((prevState) => {
          const newState = [...prevState];
          newState[infoIndex].selectedOptions.push(option);
          return newState;
        })
      : setInformationData((prevState) => {
          const newState = [...prevState];
          newState[infoIndex].selectedOptions = newState[
            infoIndex
          ].selectedOptions.filter((item) => item.name !== option.name);
          return newState;
        });
  };

  // handle add information options
  const handleAddOption = (id) => {
    navigate(`/information/${id}`);
  };

  return (
    <div className={`${className} space-y-4`}>
      <h4 className="text-sm font-semibold text-gray-600">
        Choose product informations
      </h4>
      <table className="w-full">
        <thead>
          <tr className="text-sm whitespace-nowrap">
            <th className="px-2 py-1 border border-blue-600 w-32 text-left">
              Information
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
          {informationData &&
            informationData.map((info, infoIndex) => (
              <tr key={infoIndex} className="text-sm">
                <td className="px-2 py-1 border border-blue-600">
                  {info.name}
                </td>
                <td className="px-2 py-1 border border-blue-600">
                  <div className="columns-1 sm:columns-2 md:columns-3">
                    {/* populate checkboxes from options and save user input in selectedOptions */}
                    {info.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="w-full flex items-center border-none"
                      >
                        <input
                          type="checkbox"
                          id={`${infoIndex}--${optionIndex}`}
                          className="mr-2 outline-none border-none cursor-pointer"
                          checked={
                            info.selectedOptions.find(
                              (selectedOption) =>
                                selectedOption.id === option.id
                            )
                              ? true
                              : false
                          }
                          onChange={(event) =>
                            handleSelectedOption(event, infoIndex, option)
                          }
                        />
                        <label
                          htmlFor={`${infoIndex}--${optionIndex}`}
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
                    className="flex items-center font-semibold px-1 py-0.5 opacity-70 
                          bg-green-50 text-green-700 border border-green-700 
                          hover:bg-green-100 rounded mx-auto"
                    onClick={() => handleAddOption(info.id)}
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

export default ProductInfos;
