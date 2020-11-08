import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import './Nav.css';

function Nav() {
  const [NavOptions, setNavOptions] = useState("");
  const [search, setSearch] = useState("");

  const Logout = () => {
    API.Logout().then(() => {
      window.location.replace("/");
    });
  }

  const submitSearch = (event) => {
    event.preventDefault();
    window.location.href = "/searchResults/" + search
  }

  const LoggedInNav = (
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown" id="LoggedInMenu">
          <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Account
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#">Orders</a>
            <a className="dropdown-item" href="/wishList">Wishlist</a>
            <a className="dropdown-item" href="/userProfile">Account Settings</a>
            <a className="dropdown-item" href="/postProduct">Sell</a>
            <a className="dropdown-item" onClick={Logout}>Logout</a>
          </div>
        </li>
        <li className="nav-item active" id="HomeItem">
          <a className="nav-link" href="/userCart" id="HomeLink">Cart</a>
        </li>
      </ul>
    </div>
  )

  const LoggedOutNav = (
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
  )

  useEffect(() => {
    API.getUserLoginStatus().then((res) => {
      if (res.data.message) {
        setNavOptions(LoggedInNav);
      } else {
        setNavOptions(LoggedOutNav)
      }
    });
  }, [])


  return (
    <nav className="navbar navbar-expand">
        <a className="navbar-brand" href="/">Sky Line Ecommerce</a>
        <div>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(event) => {setSearch(event.target.value)}}></input>
            <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit" onClick={submitSearch}>Search</button>
          </form>
        </div>
        {NavOptions}
    </nav>
  );
}

export default Nav;
