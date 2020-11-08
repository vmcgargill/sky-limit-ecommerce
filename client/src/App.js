import React from 'react';
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import PostNewProduct from './pages/Product/PostNewProduct'
import EditProduct from './pages/Product/EditProduct'
import DeleteProduct from './pages/Product/DeleteProduct'
import Product from './pages/Product/Product'
import Merchant from './pages/User/Merchant'
import AccountSettings from './pages/User/AccountSettings'
import EditProfile from './pages/User/EditProfile'
import UpdateName from './pages/User/UpdateName';
import UpdateEmail from './pages/User/UpdateEmail';
import UpdatePassword from './pages/User/UpdatePassword';
import SellingAccount from './pages/User/SellingAccount'
import WishList from './pages/User/WishList'
import Cart from './pages/User/Cart'
import CartAdded from './pages/User/CartAdded'
import SearchResualts from "./pages/Product/SearchResults"
import './App.css';

import {Route} from "react-router-dom" 

function App() {
  return (
    <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/postProduct" component={PostNewProduct} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/editProduct/:id" component={EditProduct} />
        <Route exact path="/deleteProduct/:id" component={DeleteProduct} />
        <Route exact path="/merchant/:id" component={Merchant} />
        <Route exact path="/accountSettings" component={AccountSettings} />
        <Route exact path="/editProfile" component={EditProfile} />
        <Route exact path="/updateName" component={UpdateName} />
        <Route exact path="/updateEmail" component={UpdateEmail} />
        <Route exact path="/updatePassword" component={UpdatePassword} />
        <Route exact path="/sellingAccount" component={SellingAccount} />
        <Route exact path="/wishList" component={WishList} />
        <Route exact path="/userCart" component={Cart} />
        <Route exact path="/cartAdded/:id" component={CartAdded} />
        <Route exact path="/searchResults/:search" component={SearchResualts} />
    </div>
  );
}

export default App;
