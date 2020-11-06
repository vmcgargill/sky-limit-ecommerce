import React from 'react';
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import PostProduct from './components/Product/PostProduct'
import Product from './components/Product/Product'
import Merchant from './components/User/Merchant'
import Profile from './components/User/Profile'
import EditProfile from './components/User/EditProfile'
import './App.css';

import {Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/postProduct" component={PostProduct} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/merchant/:id" component={Merchant} />
        <Route exact path="/userProfile" component={Profile} />
        <Route exact path="/editProfile" component={EditProfile} />
    </div>
  );
}

export default App;
