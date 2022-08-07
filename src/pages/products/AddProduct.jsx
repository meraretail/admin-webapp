import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle2Btn from '../../components/common/PageTitle2Btn';
import Tab1ProductBasics from '../../components/products/tabs/Tab1ProductBasics';
import Tab2ProductVariations from '../../components/products/tabs/Tab2ProductVariations';
import Tab3ProductImages from '../../components/products/tabs/Tab3ProductImages';
import Tab4ProductOptions from '../../components/products/tabs/Tab4ProductOptions';
import { productTabs } from '../../listItems/productItems/productTabs';

const NewProduct = () => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');

  /******** STATES TO BE PASSED TO CHILDREN ******/
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);
  const [parameters, setParameters] = useState(null);

  // Step 1: get child category parameters by id
  useEffect(() => {
    let isMounted = true;
    const getChildCategory = async () => {
      setResMessage('');
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'get',
          url: `/api/product/admin/get-childcategory-attributes/${selectedChildCategory?.id}`,
        });
        setLoading(false);
        isMounted && setParameters(response.data.childCategory);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    getChildCategory();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, selectedChildCategory]);

  // console.log('selectedChildCategory', selectedChildCategory);

  /********** HANDLE TAB CLICK ************/
  const [activeId, setActiveId] = useState(1);

  const handleTabClick = (id) => {
    setActiveId(id);
    if (id !== 1) {
      setResSuccess(false);
      setResMessage(
        'Please add product name & basic details first! Redirecting...'
      );
    } else {
      setResSuccess(true);
      setResMessage('');
    }
  };

  return (
    <div>
      <PageTitle2Btn
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
        title='Add new product'
        btn1Link='/products/bulk-upload'
        btn1Text='Upload excel/csv to bulk create products'
        btn1Type='positive'
        btn2Link='/products'
        btn2Text='See all products'
        btn2Type='negative'
      />
      <div className='px-4 mt-[5.5rem] mb-10'>
        <SuccErrMsg
          resMessage={resMessage}
          resSuccess={resSuccess}
          showSuccess={true}
        />

        <h3 className='mb-4'>Complete 4 short steps to create new product:</h3>

        {/* tabs component starts */}
        <div className='flex flex-col w-full bg-white border rounded shadow'>
          {/* tabs container */}
          <div className='flex'>
            {productTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`p-2 cursor-pointer flex-1 text-center text-gray-600 font-bold font-barlow text-sm uppercase border border-b ${
                  tab.id === activeId
                    ? 'bg-white border-b-transparent border-l border-r border-t-2 border-t-blue-600 transition duration-300 ease-in-out'
                    : 'bg-gray-100 border-gray-300'
                }`}
              >
                {tab.content}
              </div>
            ))}
          </div>
          {/* tabs container ends */}
          {/* tabs content starts */}
          <div>
            <div
              className={`${
                activeId === 1 ? 'block' : 'hidden'
              } p-4 min-h-[20rem] transition duration-500 ease-in-out`}
            >
              <Tab1ProductBasics
                activeId={activeId}
                setActiveId={setActiveId}
                loading={loading}
                setLoading={setLoading}
                setResSuccess={setResSuccess}
                setResMessage={setResMessage}
                selectedChildCategory={selectedChildCategory}
                setSelectedChildCategory={setSelectedChildCategory}
                parameters={parameters}
              />
            </div>
            <div
              className={`${
                activeId === 2 ? 'block' : 'hidden'
              } p-4 min-h-[20rem] transition duration-500 ease-in-out`}
            >
              <Tab2ProductVariations />
            </div>
            <div
              className={`${
                activeId === 3 ? 'block' : 'hidden'
              } p-4 min-h-[20rem] transition duration-500 ease-in-out`}
            >
              <Tab3ProductImages />
            </div>
            <div
              className={`${
                activeId === 4 ? 'block' : 'hidden'
              } p-4 min-h-[20rem] transition duration-500 ease-in-out`}
            >
              <Tab4ProductOptions />
            </div>
          </div>
        </div>
        {/* tabs component ends */}
      </div>
    </div>
  );
};

export default NewProduct;
