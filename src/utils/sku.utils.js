export function arrayPermutation(...args) {
  var r = [],
    max = args.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = args[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i === max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

export function generateSkuFromProductAndVariation(product, variationData) {
  // console.log('variationData', variationData);
  // reindex array to make variation.name === 'Color' as the first element
  const variationDataReindexed = variationData.map((variation) => {
    return variation;
  });
  variationDataReindexed.sort((a, b) => a.name.localeCompare(b.name));
  // console.log('variationDataSorted', variationDataSorted);
  // variation data is an array of objects
  // make a new array allOptions made of all non empty selectedOptions field
  const allOptions = variationDataReindexed.reduce((acc, curr) => {
    if (curr.selectedOptions.length > 0) {
      acc.push(curr.selectedOptions);
    }
    return acc;
  }, []);
  // console.log('allOptions', allOptions);
  if (allOptions.length > 0) {
    const result = arrayPermutation(...allOptions);

    // console.log('result', result);
    // result is an array of objects, join object name to generate SKU
    // const combinationArray = result.map((optionArray) =>
    //   optionArray.map((option) => option.name).join('')
    // );
    // console.log('combinationArray', combinationArray);
    // // convert all items of combinationArray to lowercase, remove spaces and arrange all characters alphabetically
    // const sortedCombinationArray = combinationArray.map((item) => {
    //   return item.toLowerCase().replace(/\s/g, '').split('').sort().join('');
    // });
    // console.log('sortedCombinationArray', sortedCombinationArray);

    const skuArray = [];
    result.map((optionArray) =>
      // push to skuArray
      skuArray.push({
        sellerString: optionArray.map((option) => option.name).join(', '),
        combinationString: optionArray.map((option) => option.name).join(''),
        skuIdentifier: optionArray
          .map((option) => option.name)
          .join('')
          .toLowerCase()
          .replace(/\s/g, '')
          .split('')
          .sort()
          .join(''),
        skuName:
          product.childCategory.subCategory.category.name
            .replace(/[^\w\s]/gi, '') // replacing special characters
            .toUpperCase()
            .substring(0, 3) + // take only first 3 characters
          product.childCategory.subCategory.name
            .replace(/[^\w\s]/gi, '')
            .toUpperCase()
            .substring(0, 3) +
          product.childCategory.name
            .replace(/[^\w\s]/gi, '')
            .toUpperCase()
            .substring(0, 3) +
          product.id +
          product.name
            .replace(/[^\w\s]/gi, '')
            .toUpperCase()
            .substring(0, 3) +
          optionArray
            .map((option) => option.name)
            .join('')
            .toUpperCase()
            .replace(/\s/g, '') // replacing spaces
            .split('')
            .sort()
            .join(''),
        price: 0.0,
        stock: 0,
      })
    );

    return skuArray;
  }
}
