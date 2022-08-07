import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SuccErrMsg from '../../components/common/SuccErrMsg';
import ProductsTable from '../../components/products/ProductsTable';
import PageTitle from '../../components/common/PageTitle';
import ItemContainer from '../../components/common/ItemContainer';
import MainContainer from '../../components/common/MainContainer';
import EditChildCatName from '../../components/categories/EditChildCatName';
import EditChildCategoryAttributes from '../../components/categories/EditChildCategoryAttributes';

const EditChildCategory = () => {
  const { childCategoryId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(true);
  const [resMessage, setResMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  const [childCategory, setChildCategory] = useState('');

  // List of all available attributes
  const [variationsList, setVariationsList] = useState([]); // all variations list
  const [featuresList, setFeaturesList] = useState([]); // all features list
  const [detailsList, setDetailsList] = useState([]); // all details list

  // Array of selected attributes
  const [variations, setVariations] = useState([]); // selected variations name array
  const [features, setFeatures] = useState([]); // selected features
  const [details, setDetails] = useState([]); // selected details name array

  // Step 1: get child category by id
  useEffect(() => {
    let isMounted = true;
    const getChildCategory = async () => {
      setResMessage('');
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'get',
          url: `/api/product/admin/get-childcategory/${childCategoryId}`,
        });
        setLoading(false);
        isMounted && setChildCategory(response.data.childCategory);
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
  }, [axiosPrivate, childCategoryId]);

  // Step 2: Get list of all available attributes and save in respective lists
  useEffect(() => {
    let isMounted = true;
    const getAttributes = async () => {
      setResMessage('');
      setLoading(true);
      try {
        const response = await axiosPrivate({
          method: 'get',
          url: '/api/product//list-all-attributes',
        });
        setLoading(false);
        isMounted && setVariationsList(response.data.variations);
        isMounted && setFeaturesList(response.data.features);
        isMounted && setDetailsList(response.data.details);
        isMounted && setResSuccess(response.data.success);
        isMounted && setResMessage(response.data.message);
      } catch (error) {
        setLoading(false);
        setResSuccess(error.response.data.success);
        setResMessage(error.response.data.message);
      }
    };
    getAttributes();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  // Step 3: Set selected attributes based on data in childCategory
  useEffect(() => {
    const varArray = [];
    if (childCategory && childCategory.variations) {
      childCategory.variations.map((variation) =>
        varArray.push(variation.name)
      );
      setVariations(varArray);
    }

    const featArray = [];
    if (childCategory && childCategory.features) {
      childCategory.features.map((feature) => featArray.push(feature.name));
      setFeatures(featArray);
    }

    const detArray = [];
    if (childCategory && childCategory.details) {
      childCategory.details.map((detail) => detArray.push(detail.name));
      setDetails(detArray);
    }
  }, [childCategory]);

  // Step 4: update on submit
  const handleUpdateData = async (event, url, data) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPrivate({
        method: 'put',
        url: url,
        data: data,
      });
      setLoading(false);
      setResSuccess(response.data.success);
      setResMessage(response.data.message);
    } catch (error) {
      setLoading(false);
      setResSuccess(error.response.data.success);
      setResMessage(error.response.data.message);
    }
  };

  const attributeData = [
    {
      title: 'Choose variations for child category',
      list: variationsList,
      url: `/api/product/admin/child-category/${childCategory.id}/update-ch-variations`,
      selectedArray: variations,
      setSelectedArray: setVariations,
      btnText: 'Update variations',
      summary:
        'Properties which create a new product option (e.g. size, color, RAM, etc.)',
    },
    {
      title: 'Choose features for child category',
      list: featuresList,
      url: `/api/product/admin/child-category/${childCategory.id}/update-ch-features`,
      selectedArray: features,
      setSelectedArray: setFeatures,
      btnText: 'Update features',
      summary:
        'Key features which can be used to filter products based on customer requirements',
    },
    {
      title: 'Choose details for child category',
      list: detailsList,
      url: `/api/product/admin/child-category/${childCategory.id}/update-ch-details`,
      selectedArray: details,
      setSelectedArray: setDetails,
      btnText: 'Update details',
      summary:
        'Essential FAQs which customers have while making a purchase decision',
    },
  ];

  return (
    <div>
      <PageTitle
        title='View/Edit child category'
        btnText='Back to previous page'
        type='negative'
      />
      {/* page header ends */}
      <MainContainer>
        {/* success / error message zone */}
        <SuccErrMsg
          resMessage={resMessage}
          resSuccess={resSuccess}
          showSuccess={true}
        />
        {/* success / error message zone ends */}
        {/* User information update forms start */}

        {/* Child category name update forms start */}
        <EditChildCatName
          childCategory={childCategory}
          loading={loading}
          setLoading={setLoading}
          setResSuccess={setResSuccess}
          setResMessage={setResMessage}
          rerender={rerender}
          setRerender={setRerender}
        />
        {/* child category name update ends */}
        {/* Child category variations, features, infos, details starts */}
        <ul className='space-y-6'>
          {attributeData.map((attribute, index) => (
            <li key={index}>
              <ItemContainer title={attribute.title}>
                <EditChildCategoryAttributes
                  list={attribute.list}
                  selectedArray={attribute.selectedArray}
                  setSelectedArray={attribute.setSelectedArray}
                  loading={loading}
                  btnText={attribute.btnText}
                  summary={attribute.summary}
                  handleSubmit={(event) =>
                    handleUpdateData(
                      event,
                      attribute.url,
                      attribute.selectedArray
                    )
                  }
                />
              </ItemContainer>
            </li>
          ))}
        </ul>
        {/* Child category variations, features, infos, details ends */}

        {/* products list */}
        <ItemContainer title='Products in this child category'>
          <ProductsTable
            childCategoryId={childCategoryId}
            loading={loading}
            setLoading={setLoading}
            setResSuccess={setResSuccess}
            setResMessage={setResMessage}
            rerender={rerender}
          />
        </ItemContainer>
        {/* products list ends */}
      </MainContainer>
    </div>
  );
};

export default EditChildCategory;
