import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchSuggestions from "./SearchSuggestions"
import './Nav.css';

function Nav({authStatus, Suggestions}) {
  const [NavOptions, setNavOptions] = useState("");
  const [NavSearchSuggestions, setNavSearchSuggestions] = useState(SearchSuggestions);

  useEffect(() => {

    const LoggedInNav = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown" id="LoggedInMenu">
            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" href="#section"
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Account
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link to={`/accountSettings`} className="dropdown-item">Account Settings</Link>
              <Link to={`/userOrders`} className="dropdown-item">Orders</Link>
              <Link to={`/wishList`} className="dropdown-item">Wishlist</Link>
              <Link to={`/postProduct`} className="dropdown-item">Sell</Link>
              <Link onClick={() => {
                API.Logout().then(() => {
                  window.location.replace("/");
                });
              }} to="#section" className="dropdown-item">Logout</Link>
            </div>
          </li>
          <li className="nav-item active" id="HomeItem">
            <Link to={`/userCart`} className="nav-link">Cart</Link>
          </li>
        </ul>
      </div>
    )

    const LoggedOutNav = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item" stlye="display: none" id="Login">
            <Link to={`/login`} className="nav-link">Login</Link>
          </li>
          <li className="nav-item" id="Signup">
            <Link to={`/signup`} className="nav-link">Signup</Link>
          </li>
        </ul>
      </div>
    )

    if (authStatus === undefined) {
      setNavOptions("")
    } else if (authStatus) {
      setNavOptions(LoggedInNav)
    } else if (!authStatus) {
      setNavOptions(LoggedOutNav)
    }

    if (authStatus || !authStatus) {
      let SearchArray = [...SearchSuggestions, ...Suggestions];
      setNavSearchSuggestions([...new Set(SearchArray)])
    }


  }, [setNavOptions, authStatus, Suggestions])


  return (
    <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to={"/"}>Sky Limit Ecommerce</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">Menu<br/>
       <div className="menuIcon"><img src="/menuicon.png" alt="..." width="50" height="50" ></img></div> 
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <Autocomplete
              freeSolo
              className="SearchBar"
              id="testinput"
              options={NavSearchSuggestions}
              renderInput={(params) => (
                <TextField
                  className="SearchInput"
                  {...params}
                  placeholder="Search input"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
            <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit" onClick={(event) => {
              event.preventDefault();
              window.location.href = "/searchResults/" + document.getElementById("testinput").value
            }}>Search</button>
          </form>
          {NavOptions}
        </div>
    </nav>
  );
}

export default Nav;
