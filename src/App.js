import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Common Pages
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Authentication Imports
import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';

// Dashboard Page
import Dashboard from './pages/Dashboard';

// User Pages
import Users from './pages/users/Users';
import AddUser from './pages/users/AddUser';
import EditUser from './pages/users/EditUser';
import AddAddress from './pages/users/AddAddress';
import EditAddress from './pages/users/EditAddress';

// Category Pages
import Categories from './pages/categories/Categories';
import SubCategories from './pages/categories/SubCategories';
import ChildCategories from './pages/categories/ChildCategories';
import EditCategory from './pages/categories/EditCategory';
import EditSubCategory from './pages/categories/EditSubcategory';
import EditChildCategory from './pages/categories/EditChildCategory';

// Category Attributes Pages
import Variations from './pages/categories/variations/Variations';
import EditVariation from './pages/categories/variations/EditVariation';
import Features from './pages/categories/features/Features';
import EditFeature from './pages/categories/features/EditFeature';
import Details from './pages/categories/details/Details';

// Product Pages
import Brands from './pages/products/Brands';
import Products from './pages/products/Products';
import AddProduct from './pages/products/AddProduct';
import BulkAddProducts from './pages/products/BulkAddProducts';
import EditProduct from './pages/products/EditProduct';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />}>
            <Route path='/' element={<Dashboard />} index />

            {/* User routes */}
            <Route path='/users' element={<Users />} />
            <Route path='/user/new' element={<AddUser />} />
            <Route path='/user/edit/:userId' element={<EditUser />} />
            <Route path='/user/:userId/add-address' element={<AddAddress />} />
            <Route
              path='/user/:userId/edit-address/:addressId'
              element={<EditAddress />}
            />

            {/* Category routes */}
            <Route path='/categories' element={<Categories />} />
            <Route path='/sub-categories' element={<SubCategories />} />
            <Route path='/child-categories' element={<ChildCategories />} />
            <Route
              path='/category/edit/:categoryId'
              element={<EditCategory />}
            />
            <Route
              path='/sub-category/edit/:subCategoryId'
              element={<EditSubCategory />}
            />
            <Route
              path='/child-category/edit/:childCategoryId'
              element={<EditChildCategory />}
            />

            {/* Variations, Features and Details routes */}
            {/* Variation pages */}
            <Route path='/variations' element={<Variations />} />
            <Route path='/variation/edit/:id' element={<EditVariation />} />

            {/* Features pages */}
            <Route path='/features' element={<Features />} />
            <Route path='/feature/edit/:id' element={<EditFeature />} />

            {/* Details pages */}
            <Route path='/details' element={<Details />} />

            {/* Products routes */}
            <Route path='/brands' element={<Brands />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/bulk-upload' element={<BulkAddProducts />} />
            <Route path='/product/new' element={<AddProduct />} />
            <Route path='/product/edit/:productId' element={<EditProduct />} />
          </Route>
        </Route>
      </Route>

      {/* Route Not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
