import React, { useState, useEffect } from "react";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom" 
import API from "./utils/API";
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
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
import NoMatch from "./pages/NoMatch";
import './App.css';

const  App = () => {
  const [authStatus, setAuthStatus] = useState(true);
  const [navStatus, setNavStatus] = useState(undefined);
  
  const getLoginStatus = async () => {
    const res = await API.getUserData();
    if (await res.data.message) {
      await setAuthStatus(true)
      await setNavStatus(true)
    }
    else {
      await setAuthStatus(false)
      await setNavStatus(false)
    }
  }
  
  useEffect(getLoginStatus, [])

  return (
    <div className="App">
      <BrowserRouter basename="/">
      <Nav authStatus={navStatus} />
      <div className="container mainContainer">
        <Switch>
          <Route exact path="/" >
            <Home/>
          </Route>
          <Route exact path="/signup" >
            <Signup/>
          </Route>
          <Route exact path={["/login", "/login/:redirect"]} >
            <Login/>
          </Route>
          <Route exact path="/postProduct" >
            {!authStatus ? <Redirect to="/login/:redirect" /> : <PostNewProduct/>}
          </Route>
          <Route exact path="/product/:id" >
            <Product/>
          </Route>
          <Route exact path="/editProduct/:id" >
            {!authStatus ? <Redirect to="/login" /> : <EditProduct/>}
          </Route>
          <Route exact path="/deleteProduct/:id" >
            {!authStatus ? <Redirect to="/login" /> : <DeleteProduct/>}
          </Route>
          <Route exact path="/merchant/:id" >
            <Merchant/>
          </Route>
          <Route exact path="/accountSettings" >
            {!authStatus ? <Redirect to="/login" /> : <AccountSettings/>}
          </Route>
          <Route exact path="/editProfile" >
            {!authStatus ? <Redirect to="/login" /> : <EditProfile/> }
          </Route>
          <Route exact path="/updateName" >
            {!authStatus ? <Redirect to="/login" /> : <UpdateName/>}
          </Route>
          <Route exact path="/updateEmail" >
            {!authStatus ? <Redirect to="/login" /> : <UpdateEmail/>}
          </Route>
          <Route exact path="/updatePassword" >
            {!authStatus ? <Redirect to="/login" /> : <UpdatePassword/>}
          </Route>
          <Route exact path="/sellingAccount" >
            {!authStatus ? <Redirect to="/login" /> : <SellingAccount/>}
          </Route>
          <Route exact path="/wishList" >
            {!authStatus ? <Redirect to="/login" /> : <WishList/>}
          </Route>
          <Route exact path="/userCart" >
            {!authStatus ? <Redirect to="/login" /> : <Cart/>}
          </Route>
          <Route exact path="/cartAdded/:id" >
            {!authStatus ? <Redirect to="/login" /> : <CartAdded/>}
          </Route>
          <Route exact path="/searchResults/:search" >
            <SearchResualts/>
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
