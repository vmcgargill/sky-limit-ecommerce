import React from 'react';
import Home from './general/Home/Home'
import Signup from './general/Signup/Signup'
import Login from './general/Login/Login'
import PostProduct from './general/Product/PostProduct'
import Product from './general/Product/Product'
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
    </div>
  );
}

export default App;
