import React from 'react';
import './Nav.css';

function Nav() {
  return (
    <nav class="navbar navbar-expand">
        <a class="navbar-brand" href="/">Sky Line Ecommerce</a>
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
              <a class="dropdown-item" href="/logout">Logout</a>
            </div>
          </li>
          <li class="nav-item active" id="HomeItem">
          <a class="nav-link" href="/" id="HomeLink">Cart</a>
          </li>
          <li class="nav-item hidden" id="Login">
          <a class="nav-link" href="/login" id="RoleLink">Login</a>
          </li>
          <li class="nav-item hidden" id="Signup">
          <a class="nav-link" href="/signup" id="RoleLink">Create Account</a>
          </li>
        </ul>
        </div>
        <div>
          <input id="SearchInput" placeholder="Search" type="text"></input>
          <button id="SearchBtn" class="button">Search</button>
          {/* <div style="display: none" id="searchAlert" class="alert alert-danger" role="alert">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span class="sr-only">Error:</span> <span class="msg"></span>
          </div> */}
        </div>
    </nav>
  );
}

export default Nav;
