import React, { useState, useEffect } from "react";
import User from "./User";
import ProductList from "../Product/ProductList";
import axios from "axios";
import './User.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/userProfile"
    }).then(function(response) {
      setUser(response.data.user)
      setProducts(response.data.products)
    });
  }, []);

  const editProfile = () => {
    window.location.href = "/editProfile";
  }
  
  return (
    <div>
      <User user={user}/>
      <button className="btn btn-success" onClick={editProfile}>Edit Profile</button>
      <button className="btn btn-success">Wishlist</button>
      <button className="btn btn-success">Orders</button>
      <button className="btn btn-success">Orders</button>
      <ProductList products={products}/>
    </div>
  )

}

export default Profile;