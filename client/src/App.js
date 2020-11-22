import React, { useState, useEffect } from "react";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import API from "./utils/API";
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import PostNewProduct from './pages/Product/PostNewProduct';
import EditProduct from './pages/Product/EditProduct';
import DeleteProduct from './pages/Product/DeleteProduct';
import Product from './pages/Product/Product';
import Merchant from './pages/User/Merchant';
import AccountSettings from './pages/User/Account/AccountSettings';
import EditProfile from './pages/User/Account/EditProfile';
import UpdateName from './pages/User/Account/UpdateName';
import UpdateEmail from './pages/User/Account/UpdateEmail';
import UpdatePassword from './pages/User/Account/UpdatePassword';
import UpdatePhone from './pages/User/Account/UpdatePhone'
import UpdateAddress from './pages/User/Account/UpdateAddress'
import UpdatePayment from './pages/User/Account/UpdatePayment'
import DeleteAccount from './pages/User/Account//DeleteAccount'
import SellingAccount from './pages/User/Account/SellingAccount';
import WishList from './pages/User/WishList';
import Cart from './pages/User/Cart';
import CartAdded from './pages/User/CartAdded';
import SearchResualts from "./pages/Product/SearchResults";
import UserOrders from "./pages/Order/UserOrders";
import ConfirmOrder from "./pages/Order/ConfirmOrder"
import Order from "./pages/Order/Order"
import Review from "./pages/Review/Review"
import PostNewReview from "./pages/Review/PostNewReview"
import ProductReviews from "./pages/Review/ProductReviews"
import NoMatch from "./pages/NoMatch";
import GoBack from "./components/Buttons/GoBack"
import Cancel from "./components/Buttons/Cancel"
import './App.css';

const  App = () => {
  const [authStatus, setAuthStatus] = useState(true);
  const [navStatus, setNavStatus] = useState(undefined);
  const [Suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    const getLoginStatus = async () => {
      const res = await API.getUserData();
      setSuggestions(res.data.SearchSuggestions);

      if (await res.data.message) {
        await setAuthStatus(true)
        await setNavStatus(true)
      }
      else {
        await setAuthStatus(false)
        await setNavStatus(false)
      }
    }
    getLoginStatus()
  }, [])

  return (
    <div className="App">
      <BrowserRouter basename="/">
      <Nav authStatus={navStatus} Suggestions={Suggestions} />
      <div className="container mainContainer">
        <Switch>
          <Route exact path="/" >
            <Home/>
          </Route>
          <Route exact path={["/signup", "/signup/:redirect", "/signup/:redirect/:id"]} >
            <Signup/>
          </Route>
          <Route exact path={["/login", "/login/:redirect", "/login/:redirect/:id"]} >
            <Login/>
          </Route>
          <Route exact path="/product/:id" >
            <Product/>
            <GoBack/>
          </Route>
          <Route exact path="/searchResults/:search" >
            <SearchResualts/>
          </Route>
          <Route exact path="/merchant/:id" >
            <Merchant/>
          </Route>
          <Route exact path="/review/:id" >
            <GoBack/>
            <Review/>
          </Route>
          <Route exact path="/product/reviews/:id" >
            <GoBack/>
            <ProductReviews/>
          </Route>
          <Route exact path="/postProduct" >
            {!authStatus ? <Redirect to="/login/postProduct" /> : <PostNewProduct/>}
          </Route>
          <Route exact path="/editProduct/:id" >
            {!authStatus ? <Redirect to="/login/sellingAccount" /> : <EditProduct/>}
          </Route>
          <Route exact path="/deleteProduct/:id" >
            {!authStatus ? <Redirect to="/login/sellingAccount" /> : <DeleteProduct/>}
          </Route>
          <Route exact path="/accountSettings" >
            {!authStatus ? <Redirect to="/login/accountSettings" /> : <AccountSettings/>}
          </Route>
          <Route exact path={["/editProfile", "/editProfile/:msg"]} >
            {!authStatus ? <Redirect to="/login/editProfile" /> : <EditProfile/> }
          </Route>
          <Route exact path="/updateName" >
            {!authStatus ? <Redirect to="/login/updateName" /> : <UpdateName/>}
            <Cancel/>
          </Route>
          <Route exact path="/updateEmail" >
            {!authStatus ? <Redirect to="/login/updateEmail" /> : <UpdateEmail/>}
            <Cancel/>
          </Route>
          <Route exact path="/updatePassword" >
            {!authStatus ? <Redirect to="/login/updatePassword" /> : <UpdatePassword/>}
            <Cancel/>
          </Route>
          <Route exact path="/updatePhone" >
            {!authStatus ? <Redirect to="/login/updatePhone" /> : <UpdatePhone/>}
            <Cancel/>
          </Route>          
          <Route exact path="/updateAddress" >
            {!authStatus ? <Redirect to="/login/updateAddress" /> : <UpdateAddress/>}
            <GoBack/>
          </Route>
          <Route exact path="/updatePayment" >
            {!authStatus ? <Redirect to="/login/updatePayment" /> : <UpdatePayment/>}
            <GoBack/>
          </Route>
          <Route exact path="/deleteAccount" >
            {!authStatus ? <Redirect to="/login/deleteAccount" /> : <DeleteAccount/>}
          </Route>
          <Route exact path="/sellingAccount" >
            {!authStatus ? <Redirect to="/login/sellingAccount" /> : <SellingAccount/>}
          </Route>
          <Route exact path="/wishList" >
            {!authStatus ? <Redirect to="/login/wishList" /> : <WishList/>}
          </Route>
          <Route exact path="/userCart" >
            {!authStatus ? <Redirect to="/login/userCart" /> : <Cart/>}
          </Route>
          <Route exact path="/cartAdded/:id" >
            <GoBack/>
            {!authStatus ? <Redirect to="/login/userCart" /> : <CartAdded/>}
          </Route>
          <Route exact path="/confirmOrder/:id">
            {!authStatus ? <Redirect to="/login/userCart" /> : <ConfirmOrder/>}
          </Route>
          <Route exact path="/order/:id" >
            {!authStatus ? <Redirect to="/login/userOrders" /> : <Order/>}
            <GoBack/>
          </Route>
          <Route exact path="/userOrders" >
            {!authStatus ? <Redirect to="/login/userOrders" /> : <UserOrders/>}
          </Route>
          <Route exact path="/productReview/:id" >
            {!authStatus ? <Redirect to="/login/userOrders" /> : <PostNewReview/>}
          </Route>
          <Route>
            <GoBack/>
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
