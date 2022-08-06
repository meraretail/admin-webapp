import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryMap from '../basics/CategoryMap';
import ProductBasics from '../basics/ProductBasics';
import ProductFeatures from '../attributes/ProductFeatures';
import ProductInfos from '../attributes/ProductInfos';
import ProductDetails from '../attributes/ProductDetails';
import LoadingButton from '../../formComponents/LoadingButton';
import Button from '../../formComponents/Button';
import SelectBrandNGender from '../basics/SelectBrandNGender';
import './CkEditor.css';
import { productTabs } from '../../../listItems/productItems/productTabs';
import {
  adminCreateProduct,
  adminUpdateProductFullById,
} from '../../../apis/product.apis';

const Tab1ProductBasics = ({
  product,
  activeId,
  setActiveId,
  loading,
  setLoading,
  setResSuccess,
  setResMessage,
  selectedChildCategory,
  setSelectedChildCategory,
  parameters,
}) => {
  const navigate = useNavigate();

  /********* STEP 1: SET PRODUCT BASICS STATE *********/
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandSearchText, setBrandSearchText] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pdtGenders, setPdtGenders] = useState([]);

  /********** STEP 2: PRODUCT ATTRIBUTES STATE **********/
  const [featureData, setFeatureData] = useState([]);
  const [informationData, setInformationData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  /********** STEP 3: SET VALUES FROM PRODUCT **********/

  useEffect(() => {
    if (product) {
      setSelectedBrand(product.brand);
      setName(product.name);
      setDescription(product.description);
      const apiValues = product.productGenders;
      const apiGenders = [];
      apiValues.map((value) => apiGenders.push(value.gender));
      setPdtGenders(apiGenders);
    }
  }, [product]);

  // console.log('product: ', product);
  // console.log('parameters: ', parameters);

  /**** STEP 4: SET FEATURES, INFORMATIONS & DETAILS FROM PARAMETERS ****/
  useEffect(() => {
    if (parameters) {
      const features = parameters.childCategory.features;
      const details = parameters.childCategory.details;

      setFeatureData(
        features.map((feature) => ({
          id: feature.id,
          name: feature.name,
          options: feature.featureOptions,
          selectedOption:
            product &&
            product.productFeatures &&
            product.productFeatures.length > 0
              ? product.productFeatures.find(
                  (productFeature) => productFeature.feature.id === feature.id
                )?.featureOption
              : feature.featureOptions[0],
        }))
      );

      setDetailData(
        details.map((detail) => ({
          id: detail.id,
          name: detail.name,
          value:
            product && product.productDetails
              ? product.productDetails.find(
                  (productDetail) => productDetail.detail.id === detail.id
                )?.detailValue
              : detail.demoAnswer,
        }))
      );
    }
  }, [parameters, product]);

  // console.log('pdtGenders: ', pdtGenders);
  // console.log('selectedBrand: ', selectedBrand);
  // console.log('brandSearchText: ', brandSearchText);

  /********* STEP 5: CREATE PRODUCT OR UPDATE WITH NEW INFO *********/
  const handleProductBasics = async (event) => {
    event.preventDefault();
    setLoading(true);
    let productId = '';
    // Step 1: Create new product if it doesn't exist
    if (!product) {
      const { data } = await adminCreateProduct(
        selectedChildCategory.id,
        selectedBrand ? selectedBrand.id : null,
        brandSearchText,
        name,
        description,
        pdtGenders
      );

      setResSuccess(data.success);
      setResMessage(data.message);
      productId = data.product.id;
    } else {
      productId = product.id;
    }

    // Step 2: Update product
    const { data } = await adminUpdateProductFullById(
      productId,
      selectedChildCategory.id,
      selectedBrand ? selectedBrand.id : null,
      brandSearchText,
      name,
      description,
      pdtGenders,
      featureData,
      informationData,
      detailData
    );

    setLoading(false);
    setResSuccess(data.success);
    setResMessage(data.message);

    // Handle next steps
    if (!product) {
      navigate(`/product/${productId}`);
    }
    if (data.success) {
      if (activeId < productTabs.length) {
        setActiveId(activeId + 1);
      }
    }
  };

  return (
    <form onSubmit={handleProductBasics}>
      <div className='space-y-4'>
        {/* category selection section */}
        <CategoryMap
          heading='Choose product category'
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          selectedChildCategory={selectedChildCategory}
          setSelectedChildCategory={setSelectedChildCategory}
        />

        <ProductBasics
          product={product}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />

        <SelectBrandNGender
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          brandSearchText={brandSearchText}
          setBrandSearchText={setBrandSearchText}
          pdtGenders={pdtGenders}
          setPdtGenders={setPdtGenders}
        />
        <div className='space-y-4 pb-2'>
          <ProductFeatures
            className=''
            featureData={featureData}
            setFeatureData={setFeatureData}
          />
          <ProductInfos
            className=''
            informationData={informationData}
            setInformationData={setInformationData}
          />
          <ProductDetails
            className=''
            detailData={detailData}
            setDetailData={setDetailData}
          />
          {loading ? (
            <LoadingButton className='bg-blue-50 text-blue-700 border border-blue-700 hover:bg-blue-100' />
          ) : (
            <Button
              text={
                product
                  ? 'UPDATE PRODUCT BASIC DETAILS'
                  : 'SAVE DETAILS AND CREATE NEW PRODUCT'
              }
              className='opacity-80 py-2 tracking-wider bg-blue-50 text-blue-700 border border-blue-700 hover:bg-blue-100'
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default Tab1ProductBasics;
