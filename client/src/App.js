import React from 'react';
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import PostNewProduct from './components/Product/PostNewProduct'
import EditProduct from './components/Product/EditProduct'
import DeleteProduct from './components/Product/DeleteProduct'
import Product from './components/Product/Product'
import Merchant from './components/User/Merchant'
import Profile from './components/User/Profile'
import EditProfile from './components/User/EditProfile'
import SellingAccount from './components/User/SellingAccount'
import WishList from './components/User/WishList'
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
        <Route exact path="/userProfile" component={Profile} />
        <Route exact path="/editProfile" component={EditProfile} />
        <Route exact path="/sellingAccount" component={SellingAccount} />
        <Route exact path="/wishList" component={WishList} />
    </div>
  );
}

export default App;
