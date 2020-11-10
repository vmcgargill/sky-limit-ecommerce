import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom" 
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <div class="container mainContainer">
        <Switch>
          <Route exact path="/" >
            <Home/>
          </Route>
          <Route exact path="/signup" >
            <Signup/>
          </Route>
          <Route exact path="/login" >
            <Login/>
          </Route>
          <Route exact path="/postProduct" >
            <PostNewProduct/>
          </Route>
          <Route exact path="/product/:id" >
            <Product/>
          </Route>
          <Route exact path="/editProduct/:id" >
            <EditProduct/>
          </Route>
          <Route exact path="/deleteProduct/:id" >
            <DeleteProduct/>
          </Route>
          <Route exact path="/merchant/:id" >
            <Merchant/>
          </Route>
          <Route exact path="/accountSettings" >
            <AccountSettings/>
          </Route>
          <Route exact path="/editProfile" >
            <EditProfile/>
          </Route>
          <Route exact path="/updateName" >
            <UpdateName/>
          </Route>
          <Route exact path="/updateEmail" >
            <UpdateEmail/>
          </Route>
          <Route exact path="/updatePassword" >
            <UpdatePassword/>
          </Route>
          <Route exact path="/sellingAccount" >
            <SellingAccount/>
          </Route>
          <Route exact path="/wishList" >
            <WishList/>
          </Route>
          <Route exact path="/userCart" >
            <Cart/>
          </Route>
          <Route exact path="/cartAdded/:id" >
            <CartAdded/>
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
