import React, { useEffect, useState } from 'react';
import { getAllGendersList } from '../../../services/product.service';

const GenderSelect = ({
  heading,
  setResStatus,
  setResMessage,
  pdtGenders,
  setPdtGenders,
}) => {
  // genderList = Master list of all genders in database
  const [genderList, setGenderList] = useState([]);

  // Step 1: Populating genderList from API
  useEffect(() => {
    getAllGendersList()
      .then((response) => {
        setGenderList(response.data.genders);
      })
      .catch((error) => {
        setResStatus(error.response.statusText);
        setResMessage(error.response.data.message);
      });
  }, [setResMessage, setResStatus]);

  // Applicable genders for the product will be stored in pdtGenders
  // pdtGenders = {id: 1, name: 'Male'}
  // genderList = [{id: 1, name: 'Male'}, {id: 2, name: 'Female'}, {id: 3, name: 'Unisex'}]

  const handleCheckboxChange = (event, listItem) => {
    event.target.checked
      ? setPdtGenders((prevState) => {
          let newState = [...prevState];
          newState.push(listItem);
          return newState;
        })
      : setPdtGenders((prevState) => {
          let newState = [...prevState];
          newState = newState.filter((item) => item.name !== listItem.name);
          return newState;
        });
  };

  // console.log('genderList', genderList);
  // console.log('pdtGenders', pdtGenders);
  return (
    <div className="grid grid-cols-4 gap-4 pb-1">
      <h4 className="col-span-1 text-sm font-semibold text-gray-600">
        {heading}
      </h4>
      <ul className="col-span-3 flex items-end gap-4">
        {genderList &&
          genderList.length > 0 &&
          genderList.map((listItem, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={listItem.id}
                name="genders"
                className="mr-2 cursor-pointer"
                checked={
                  pdtGenders.find((item) => item.name === listItem.name)
                    ? true
                    : false
                }
                onChange={(event) => handleCheckboxChange(event, listItem)}
              />
              <label htmlFor={listItem.id} className="text-sm cursor-pointer">
                {listItem.name}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GenderSelect;
