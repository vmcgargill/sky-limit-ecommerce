import React, { useState, useEffect } from "react";
import axios from "axios";
import './Nav.css';

function Nav() {
  const [Login, setLogin] = useState("");

  const Logout = () => {
    axios({
      method: "get",
      url: "/api/logout"
    }).then(function() {
      window.location.replace("/");
    });
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
              <li className="nav-item dropdown" id="LoggedInMenu">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Orders</a>
                  <a className="dropdown-item" href="#">Wishlist</a>
                  <a className="dropdown-item" href="/userProfile">Account Settings</a>
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
              <li className="nav-item" id="Signup">
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
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        {Login}
    </nav>
  );
}

export default Nav;
