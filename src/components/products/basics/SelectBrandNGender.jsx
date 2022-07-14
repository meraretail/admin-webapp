import React, { useState, useEffect } from 'react';
import { listAllBrands, listAllGenders } from '../../../apis/products.apis';
import Dropdown from '../../common/Dropdown';

const SelectBrandNGender = ({
  setResSuccess,
  setResMessage,
  selectedBrand,
  setSelectedBrand,
  brandSearchText,
  setBrandSearchText,
  pdtGenders,
  setPdtGenders,
}) => {
  // Master list of all brands and genders in database
  const [brandList, setBrandList] = useState([]);
  const [genderList, setGenderList] = useState([]);

  // Step 1: Get all brands and gender list
  useEffect(() => {
    listAllBrands()
      .then((response) => {
        setBrandList(response.data.brands);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });

    listAllGenders()
      .then((response) => {
        setGenderList(response.data.genders);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess]);

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

  return (
    <div className='space-y-4'>
      <h4 className='text-sm font-semibold text-gray-600'>
        Choose product brand name and select target customer gender
      </h4>
      <table className='w-full'>
        <thead>
          <tr className='text-sm whitespace-nowrap text-left'>
            <th className='px-4 py-1 border border-blue-600 w-[18rem]'>
              <div>Choose product brand from the list</div>
              <div className='text-sm font-normal'>
                (Type brand name if not found in list)
              </div>
            </th>
            <th className='px-4 py-1 border border-blue-600'>
              Select gender of target customers
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-blue-600'>
              <Dropdown
                list={brandList}
                placeholder='Search brand'
                value={selectedBrand ? selectedBrand.name : ''}
                setSelectedItem={setSelectedBrand}
                searchText={brandSearchText}
                setSearchText={setBrandSearchText}
                className='w-full'
                borderColor='border-transparent'
              />
            </td>
            <td className='px-4 py-1 border border-blue-600'>
              <ul className='flex items-end gap-4'>
                {genderList &&
                  genderList.length > 0 &&
                  genderList.map((listItem, index) => (
                    <li key={index}>
                      <input
                        type='checkbox'
                        id={listItem.id}
                        name='genders'
                        className='mr-2 cursor-pointer'
                        checked={
                          pdtGenders.find((item) => item.name === listItem.name)
                            ? true
                            : false
                        }
                        onChange={(event) =>
                          handleCheckboxChange(event, listItem)
                        }
                      />
                      <label
                        htmlFor={listItem.id}
                        className='text-sm cursor-pointer'
                      >
                        {listItem.name}
                      </label>
                    </li>
                  ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SelectBrandNGender;
