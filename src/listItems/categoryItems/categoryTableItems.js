/************ 1. CATEGORY ITEMS *************/

export const catPopularFilters = [
  { id: 1, text: 'This week', fromDate: '', toDate: '' },
  { id: 2, text: 'This month', fromDate: '', toDate: '' },
  { id: 3, text: 'Last 3 months', fromDate: '', toDate: '' },
  { id: 4, text: 'Last 6 months', fromDate: '', toDate: '' },
  { id: 5, text: 'Last 12 months', fromDate: '', toDate: '' },
  { id: 6, text: 'Custom range', fromDate: '', toDate: '' },
];

export const categoryTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Category', jsonKey: 'name' },
  { label: '# Images', jsonKey: 'categoryImages' },
  { label: '# Subcategories', jsonKey: 'subCategories' },
  { label: '# Childcategories', jsonKey: 'childCategories' },
  { label: '# Products', jsonKey: 'products' },
];

/************ 2. SUB CATEGORY ITEMS *************/
export const subCategoryTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Sub Category', jsonKey: 'name' },
  { label: 'Category', jsonKey: 'category' },
  { label: '# Childcategories', jsonKey: 'childCategories' },
  { label: '# Products', jsonKey: 'products' },
];

/************ 3. CATEGORY ITEMS *************/

// {label: HeaderName, jsonKey: 'headerName'}

export const childCatTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Child Category', jsonKey: 'name' },
  { label: 'Sub Category', jsonKey: 'subCategory' },
  { label: 'Category', jsonKey: 'category' },
  { label: '# Variations', jsonKey: 'variations' },
  { label: '# Features', jsonKey: 'features' },
  { label: '# Details', jsonKey: 'details' },
  { label: '# Products', jsonKey: 'products' },
];
