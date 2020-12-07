import React, { useState, useEffect } from "react";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import API from "./utils/API";
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Browse from "./pages/Product/Borwse"
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
import DeleteAccount from './pages/User/Account//DeleteAccount'
import SellingAccount from './pages/User/Account/SellingAccount';
import WishList from './pages/User/WishList';
import Cart from './pages/User/Cart';
import CartAdded from './pages/User/CartAdded';
import Checkout from "./pages/Order/Checkout"
import SearchResualts from "./pages/Product/SearchResults";
import UserOrders from "./pages/Order/UserOrders";
import ConfirmOrder from "./pages/Order/ConfirmOrder"
import Order from "./pages/Order/Order"
import Review from "./pages/Review/Review"
import PostNewReview from "./pages/Review/PostNewReview"
import ProductReviews from "./pages/Review/ProductReviews"
import CustomerReviews from "./pages/User/Account/CustomerReviews"
import EditReviews from "./pages/Review/EditReview"
import DeleteReview from "./pages/Review/DeleteReview"
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
          <Route exact path="/holiday-gifts" >
            <Browse mainHeader={"Featured Holiday Gifts"}
            subHeader={"Here are some featured holiday gifts for the whole family."}
            keywords={["holiday", "season", "gift", "christmas", "toys", "Video Games", "TV", "computer", "clothes"]}/>
          </Route>
          <Route exact path="/clothing-accessories" >
            <Browse mainHeader={"The Latest Fashion"}
            subHeader={"See the latest trending fashion options available."}
            keywords={["clothing", "jewelry", "clothes", "shirt", "pants", "shoes", "socks", "hat", "shorts", "sweater"]}/>
          </Route>
          <Route exact path="/electronics" >
            <Browse mainHeader={"Gadgets & Electronics"}
              subHeader={"Shop for the latest gadgets and electronics in the technology section."}
              keywords={["electronic", "gadget", "tablet", "iPad", "smart", "speaker", "watch", "webcam", "mouse", "keyboard"]}/>
          </Route>
          <Route exact path="/computers" >
            <Browse mainHeader={"Computer & Laptops"}
              subHeader={"Get the newest and latest models of your favorite computer brand."}
              keywords={["laptop", "desktop", "Windows", "Windows 10", "Apple", "Mac", "Macbook", "HP", "Dell", "XPS", "Lenovo", "Samsung"]}/>
          </Route>
          <Route exact path="/entertainment" >
            <Browse mainHeader={"Entertainment"}
              subHeader={"See what is available in the entertainment section."}
              keywords={["TV", "Television", "HD", "4K", "8K", "High Definition", 
              "Display", "Screen", "Sound", "System", "Bar", "Theatre", "Home Theatre", "Roku", "Fire TV"]}/>
          </Route>
          <Route exact path="/tvmovies" >
            <Browse mainHeader={"Movies & TV"}
              subHeader={"Buy and watch the latest movies and TV shows"}
              keywords={["Movie", "TV", "Show", "Series", "Episode", "Season", "Netflix", "Hulu", "Amazon Prime"]}/>
          </Route>
          <Route exact path="/videogames" >
            <Browse mainHeader={"Video Games"}
              subHeader={"Get the latest games"}
              keywords={["Video Game", "Sony", "Microsoft", "Nintendo", "Playstation", "Xbox", 
              "Switch", "Series X", "One", "360", "PS5", "PS4", "PS3", "PS2", "PS1", "Wii",
              "console", "controller", "system"]}/>
          </Route>
          <Route exact path="/toys" >
            <Browse mainHeader={"Toys & Games"}
              subHeader={"See the latest toys and games for children."}
              keywords={["toy", "children", "board game"]}/>
          </Route>
          <Route exact path="/smartphones" >
            <Browse mainHeader={"Smart Phones"}
              subHeader={"Get the latest and greatest smart phone."}
              keywords={["phone", "smart", "iPhone", "Samsung", "Galaxy", "Pixel", "Android", "iOS", "Motorola", "Nokia"]}/>
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
            <Cancel/>
          </Route>
          <Route exact path="/editProduct/:id" >
            {!authStatus ? <Redirect to="/login/sellingAccount" /> : <EditProduct/>}
            <Cancel/>
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
          <Route exact path="/deleteAccount" >
            {!authStatus ? <Redirect to="/login/deleteAccount" /> : <DeleteAccount/>}
          </Route>
          <Route exact path="/sellingAccount" >
            {!authStatus ? <Redirect to="/login/sellingAccount" /> : <SellingAccount/>}
          </Route>
          <Route exact path="/wishList" >
            {!authStatus ? <Redirect to="/login/wishList" /> : <WishList/>}
          </Route>
          <Route exact path="/cart" >
            {!authStatus ? <Redirect to="/login/cart" /> : <Cart/>}
          </Route>
          <Route exact path="/cartAdded/:id" >
            {!authStatus ? <Redirect to="/login/cart" /> : <CartAdded/>}
            <GoBack/>
          </Route>
          <Route exact path="/checkout">
            {!authStatus ? <Redirect to="/login/checkout" /> : <Checkout/>}
          </Route>
          <Route exact path="/confirmOrder/:id">
            {!authStatus ? <Redirect to="/login/cart" /> : <ConfirmOrder/>}
          </Route>
          <Route exact path="/order/:id" >
            {!authStatus ? <Redirect to="/login/orders" /> : <Order/>}
            <GoBack/>
          </Route>
          <Route exact path="/orders" >
            {!authStatus ? <Redirect to="/login/orders" /> : <UserOrders/>}
          </Route>
          <Route exact path="/productReview/:id" >
            {!authStatus ? <Redirect to="/login/orders" /> : <PostNewReview/>}
            <Cancel/>
          </Route>
          <Route exact path="/customerReviews" >
            {!authStatus ? <Redirect to="/login/customerReviews" /> : <CustomerReviews/>}
          </Route>
          <Route exact path="/editReview/:id" >
            {!authStatus ? <Redirect to="/login/customerReviews" /> : <EditReviews/>}
            <Cancel/>
          </Route>
          <Route exact path="/deleteReview/:id" >
            {!authStatus ? <Redirect to="/login/customerReviews" /> : <DeleteReview/>}
            <Cancel/>
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
