import React from 'react';
import Home from './general/Home/Home'
import Signup from './general/Signup/Signup'
import Login from './general/Login/Login'
import './App.css';

import {Route, Link} from "react-router-dom"

function App() {
  return (
    <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
    </div>
  );
}

export default App;
