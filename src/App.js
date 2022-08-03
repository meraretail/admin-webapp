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
import AddVariation from './pages/categories/variations/AddVariation';
import EditVariation from './pages/categories/variations/EditVariation';
import EditVarOption from './pages/categories/variations/EditVarOption';
import Features from './pages/categories/features/Features';
import AddFeature from './pages/categories/features/AddFeature';
import EditFeature from './pages/categories/features/EditFeature';
import EditFeatOption from './pages/categories/features/EditFeatOption';
import Details from './pages/categories/details/Details';
import AddDetail from './pages/categories/details/AddDetail';
import EditDetail from './pages/categories/details/EditDetail';

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
            <Route path='/user/:userId' element={<EditUser />} />
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
            <Route path='/variation/new' element={<AddVariation />} />
            <Route path='/variation/edit/:id' element={<EditVariation />} />
            <Route
              path='/variation-option/edit/:id'
              element={<EditVarOption />}
            />

            {/* Features pages */}
            <Route path='/features' element={<Features />} />
            <Route path='/feature/new' element={<AddFeature />} />
            <Route path='/feature/edit/:id' element={<EditFeature />} />
            <Route
              path='/feature-option/edit/:id'
              element={<EditFeatOption />}
            />

            {/* Details pages */}
            <Route path='/details' element={<Details />} />
            <Route path='/detail/new' element={<AddDetail />} />
            <Route path='/detail/edit/:id' element={<EditDetail />} />

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
