/************ 1. CATEGORY ITEMS *************/

export const catPopularFilters = [
  { id: 1, text: 'This week', fromDate: '', toDate: '' },
  { id: 2, text: 'This month', fromDate: '', toDate: '' },
  { id: 3, text: 'Last 3 months', fromDate: '', toDate: '' },
  { id: 4, text: 'Last 6 months', fromDate: '', toDate: '' },
  { id: 5, text: 'Last 12 months', fromDate: '', toDate: '' },
  { id: 6, text: 'Custom range', fromDate: '', toDate: '' },
];

export const catTableHeaders = [
  'id',
  'Category name',
  '# of Subcategories',
  '# of Child Categories',
  '# of Products',
  'Actions',
];

/************ 2. SUB CATEGORY ITEMS *************/
export const subCatTableHeaders = [
  'id',
  'Sub-category',
  'Category',
  '# Child categories',
  '# Products',
  'Actions',
];

/************ 3. CATEGORY ITEMS *************/

// {label: HeaderName, jsonKey: 'headerName'}

export const childCatTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Child Category', jsonKey: 'name' },
  { label: 'Sub Category', jsonKey: 'subCategory' },
  { label: 'Category', jsonKey: 'category' },
  { label: '# Products', jsonKey: 'products' },
  { label: '# Variations', jsonKey: 'variations' },
  { label: '# Features', jsonKey: 'features' },
  { label: '# Details', jsonKey: 'details' },
];
