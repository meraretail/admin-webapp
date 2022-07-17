export const varTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Variation', jsonKey: 'name' },
  { label: 'Options', jsonKey: 'variationOptions' },
  {
    label: 'Image Changes',
    jsonKey: 'variesImage',
    type: 'boolean',
    center: true,
  },
];

export const varOptTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Option Name', jsonKey: 'name' },
  { label: 'Value', jsonKey: 'value' },
  { label: 'Variation', jsonKey: 'variation' },
  {
    label: 'Image Changes',
    jsonKey: 'variesImage',
    type: 'boolean',
    center: true,
  },
];

export const featTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Feature', jsonKey: 'name' },
  { label: 'Options', jsonKey: 'featureOptions' },
];

export const featOptTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Option Name', jsonKey: 'name' },
  { label: 'Feature', jsonKey: 'feature' },
];

export const detailTableItems = [
  { label: 'Id', jsonKey: 'id' },
  { label: 'Detail', jsonKey: 'name' },
  { label: 'Demo Answer', jsonKey: 'demoAnswer' },
];
