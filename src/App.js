import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';

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

// Product Pages
import Products from './pages/products/Products';
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

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      {/* Protected Routes */}
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
        <Route path='/category/edit/:categoryId' element={<EditCategory />} />
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
        <Route path='/variation-option/:id' element={<EditVarOption />} />

        {/* Features pages */}
        <Route path='/features' element={<Features />} />
        <Route path='/feature/new' element={<AddFeature />} />
        <Route path='/feature/edit/:id' element={<EditFeature />} />
        <Route path='/feature-option/edit/:id' element={<EditFeatOption />} />

        {/* Details pages */}
        <Route path='/details' element={<Details />} />
        <Route path='/detail/new' element={<AddDetail />} />
        <Route path='/detail/edit/:id' element={<EditDetail />} />

        {/* Products routes */}
        <Route path='/products' element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
