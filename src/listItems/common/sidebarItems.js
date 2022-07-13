export const sidebarItems = [
  { id: 1, text: 'Dashboard', link: '/' },
  { id: 2, text: 'Users', link: '/users' },
  {
    id: 3,
    text: 'Categories',
    link: '/categories',
    children: [
      { id: 3.1, text: 'Categories', link: '/categories' },
      { id: 3.2, text: 'Sub categories', link: '/sub-categories' },
      { id: 3.3, text: 'Child categories', link: '/child-categories' },
      { id: 3.4, text: 'Variations', link: '/variations' },
      { id: 3.5, text: 'Features', link: '/features' },
      { id: 3.7, text: 'Details', link: '/details' },
    ],
  },
  {
    id: 4,
    text: 'Products',
    link: '/products',
    icon: 'icon',
    children: [
      { id: 4.1, text: 'Products', link: '/products' },
      { id: 4.2, text: 'Brands', link: '/brands' },
    ],
  },
  {
    id: 5,
    text: 'CMS',
    link: '/cms',
    icon: 'icon',
    children: [
      {
        id: 5.1,
        text: 'Home CMS',
        link: '/cms/home-main-banner',
        icon: 'icon',
      },
      { id: 5.2, text: 'Other CMS', link: '/cms/other' },
    ],
  },
  {
    id: 6,
    text: 'Messages',
    link: '/messages',
    icon: 'icon',
    children: [
      { id: 6.1, text: 'User messages', link: '/messages' },
      { id: 6.2, text: 'Seller messages', link: '/messages' },
    ],
  },
];
