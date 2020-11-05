import React, { useState, useEffect } from "react";
import axios from "axios";
import './Nav.css';

function Nav() {
  const [Login, setLogin] = useState("");

  const Logout = () => {
    axios({
      method: "get",
      url: "/api/logout"
    }).then(function(response) {
      if (response.data.message) {
        window.location.replace("/");
      }
    })
  }

  useEffect(() => {

    axios({
      method: "get",
      url: "/api/user_data"
    }).then(function(response) {
      if (response.data.message) {
        setLogin(
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown hidden" id="LoggedInMenu">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Orders</a>
                  <a className="dropdown-item" href="#">Wishlist</a>
                  <a className="dropdown-item" href="#">Account Settings</a>
                  <a className="dropdown-item" href="/postProduct">Sell</a>
                  <a className="dropdown-item" onClick={Logout}>Logout</a>
                </div>
              </li>
              <li className="nav-item active" id="HomeItem">
                <a className="nav-link" href="/" id="HomeLink">Cart</a>
              </li>
            </ul>
          </div>
        , [])
      } else {
        setLogin(
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" stlye="display: none" id="Login">
                <a className="nav-link" href="/login" id="RoleLink">Login</a>
              </li>
              <li className="nav-item" display="hidden" id="Signup">
                <a className="nav-link" href="/signup" id="RoleLink">Signup</a>
              </li>
            </ul>
          </div>
        , [])
      }
    })

  }, [])


  return (
    <nav className="navbar navbar-expand">
        <a className="navbar-brand" href="/">Sky Line Ecommerce</a>
        <div>
          <input id="SearchInput" placeholder="Search" type="text"></input>
          <button id="SearchBtn" className="button">Search</button>
          {/* <div style="display: none" id="searchAlert" class="alert alert-danger" role="alert">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span class="sr-only">Error:</span> <span class="msg"></span>
          </div> */}
        </div>
        {Login}
    </nav>
  );
}

export default Nav;
