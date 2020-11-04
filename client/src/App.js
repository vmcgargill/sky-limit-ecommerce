import React from 'react';
import './css/App.css';
import Home from './general/Home'
import Signup from './general/Signup'
import Login from './general/Login'

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
