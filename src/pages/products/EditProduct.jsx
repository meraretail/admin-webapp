import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import PageTitle2Btn from '../../components/common/PageTitle2Btn';
import Tab1ProductBasics from '../../components/products/tabs/Tab1ProductBasics';
import Tab2ProductVariations from '../../components/products/tabs/Tab2ProductVariations';
import Tab3ProductImages from '../../components/products/tabs/Tab3ProductImages';
import Tab4ProductOptions from '../../components/products/tabs/Tab4ProductOptions';
import { productTabs } from '../../listItems/productItems/productTabs';
import { adminGetProductById } from '../../apis/product.apis';

const EditProduct = () => {
  const { productId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  /*** STEP 1: GET PRODUCT BY ID, IF PRODUCT ? SET CHILD CATEGORY ***/

  const [product, setProduct] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);
  const [parameters, setParameters] = useState(null);

  useEffect(() => {
    if (productId) {
      adminGetProductById(productId)
        .then((res) => {
          // console.log('res', res);
          setProduct(res.data.product);
          setSelectedChildCategory(res.data.product.childCategory);
        })
        .catch((err) => {
          setResSuccess(err.data.success);
          setResMessage(err.data.message);
        });
    }
  }, [productId, rerender]);

  /*** STEP 2: IF SELECTED CHILD CATEGORY ? SET CHILD CATEGORY PARAMETERS ***/
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

  /********* EXTRACT PRODUCT VARIATIONS TO CHOOSE UPLOAD PARAMETERS *********/
  const [imageVariations, setImageVariations] = useState([]);
  // has customName, customDesc
  const [optionsData, setOptionsData] = useState([]);
  // get the variation from productVariations where variation.variesImage = true
  useEffect(() => {
    let tempVarImg = []; // has variationID, variationOptionID, and images array
    let tempVarOpt = []; // has variationID, variationOptionID, and name/desc
    product &&
      product.productVariations.forEach((item) => {
        if (item.variation.variesImage) {
          tempVarImg.push({
            variationId: item.variation.id,
            variationName: item.variation.name,
            variationOptionId: item.variationOption.id,
            variationOptionName: item.variationOption.name,
            images: [],
          });
          tempVarOpt.push({
            variationId: item.variation.id,
            variationName: item.variation.name,
            variationOptionId: item.variationOption.id,
            variationOptionName: item.variationOption.name,
            name: '',
            description: '',
          });
        }
      });
    setImageVariations(tempVarImg);
    setOptionsData(tempVarOpt);
  }, [product]);

  /****** MISC STEP: HANDLE TAB CLICK *******************/
  const [activeId, setActiveId] = useState(1);

  const handleActiveChange = (id) => {
    setActiveId(id);
  };

  // console.log('product', product);

  return (
    <div>
      <PageTitle2Btn
        className='fixed top-0 left-[12rem] right-0 px-4 shadow'
        title='Edit product'
        btn1Link='/products/bulk-upload'
        btn1Text='Upload excel/csv to bulk create products'
        btn1Type='positive'
        btn2Link='/products'
        btn2Text='See all products'
        btn2Type='negative'
      />
      <div className='px-4 mt-[5rem] mb-10'>
        {/* success / error message zone */}
        <SuccErrMsg
          resMessage={resMessage}
          resSuccess={resSuccess}
          showSuccess={true}
        />
        {/* end of success / error message zone */}

        {/* tabs component starts */}
        <div className='flex flex-col w-full bg-white border rounded shadow'>
          {/* tabs container */}
          <div className='flex'>
            {productTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => handleActiveChange(tab.id)}
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
                product={product}
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
              <Tab2ProductVariations
                product={product}
                activeId={activeId}
                setActiveId={setActiveId}
                loading={loading}
                setLoading={setLoading}
                setResSuccess={setResSuccess}
                setResMessage={setResMessage}
                rerender={rerender}
                setRerender={setRerender}
                parameters={parameters}
              />
            </div>
            <div
              className={`${
                activeId === 3 ? 'block' : 'hidden'
              } p-4 min-h-[20rem] transition duration-500 ease-in-out`}
            >
              <Tab3ProductImages
                product={product}
                activeId={activeId}
                setActiveId={setActiveId}
                loading={loading}
                setLoading={setLoading}
                setResSuccess={setResSuccess}
                setResMessage={setResMessage}
                rerender={rerender}
                setRerender={setRerender}
                imageVariations={imageVariations}
              />
            </div>
            <div
              className={`${
                activeId === 4 ? 'block' : 'hidden'
              } p-4 min-h-[20rem] transition duration-500 ease-in-out`}
            >
              <Tab4ProductOptions
                product={product}
                loading={loading}
                setLoading={setLoading}
                setResSuccess={setResSuccess}
                setResMessage={setResMessage}
                rerender={rerender}
                setRerender={setRerender}
                optionsData={optionsData}
              />
            </div>
          </div>
        </div>
        {/* end of tab component */}
      </div>
    </div>
  );
};

export default EditProduct;
