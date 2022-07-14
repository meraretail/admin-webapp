import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../../common/Dropdown';
import { listAllBrands } from '../../../apis/products.apis';

const BrandMap = ({
  heading,
  subHeading,
  setResSuccess,
  setResMessage,
  selectedBrand,
  setSelectedBrand,
}) => {
  const [brandOpen, setBrandOpen] = useState(false);
  const [brandList, setBrandList] = useState([]);

  // Step 2: Get all brand list to add brand type and brand geo
  useEffect(() => {
    listAllBrands()
      .then((response) => {
        setBrandList(response.data.brands);
      })
      .catch((error) => {
        setResSuccess(error.data.success);
        setResMessage(error.data.message);
      });
  }, [setResMessage, setResSuccess]);

  return (
    <div className='grid md:grid-cols-4 gap-4 items-center'>
      <div className='col-span-1'>
        <h4 className='text-sm font-semibold text-gray-600'>{heading}</h4>
        <span>({subHeading})</span>
      </div>
      <div className='col-span-3 grid md:grid-cols-3 gap-4'>
        <div className='col-span-1'>
          <Dropdown
            list={brandList}
            placeholder='Search brand'
            value={selectedBrand ? selectedBrand.name : ''}
            selectedItem={selectedBrand}
            setSelectedItem={setSelectedBrand}
            onClickOutside={() => setBrandOpen(false)}
            open={brandOpen}
            setOpen={setBrandOpen}
            className='w-full'
          />
        </div>
        <div className='col-span-1 md:col-span-2 ml-4 mt-2'>
          <Link to='/brand/new'>
            <span className='text-blue-700 underline font-manrope font-semibold text-sm'>
              Did not find your product brand? Create new!
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandMap;
