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

  axios({
    method: "get",
    url: "/api/user_data"
  }).then(function(response) {
    if (response.data.message) {
      console.log("Logged in!")
      setLogin(
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown hidden" id="LoggedInMenu">
              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Account
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">Orders</a>
                <a class="dropdown-item" href="#">Wishlist</a>
                <a class="dropdown-item" href="#">Account Settings</a>
                <a class="dropdown-item" href="#">Sell</a>
                <a class="dropdown-item" onClick={Logout}>Logout</a>
              </div>
            </li>
            <li class="nav-item active" id="HomeItem">
              <a class="nav-link" href="/" id="HomeLink">Cart</a>
            </li>
          </ul>
        </div>
      )
    } else {
      setLogin(
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" stlye="display: none" id="Login">
              <a class="nav-link" href="/login" id="RoleLink">Login</a>
            </li>
            <li class="nav-item" display="hidden" id="Signup">
              <a class="nav-link" href="/signup" id="RoleLink">Signup</a>
            </li>
          </ul>
        </div>
      )
    }
  })

  return (
    <nav class="navbar navbar-expand">
        <a class="navbar-brand" href="/">Sky Line Ecommerce</a>
        <div>
          <input id="SearchInput" placeholder="Search" type="text"></input>
          <button id="SearchBtn" class="button">Search</button>
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
