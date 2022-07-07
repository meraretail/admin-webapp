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

export const subCatTableHeaders = [
  'id',
  'Sub-category',
  'Category',
  '# Child categories',
  '# Products',
  'Actions',
];

export const childCatTableHeaders = [
  'id',
  'Child-category',
  'Sub-category',
  'Category',
  '# Variations',
  '# Features',
  '# Infos',
  '# Details',
  '# Products',
  'Actions',
];
