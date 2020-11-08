import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import './User.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.getUserProfile().then(res => {
      setUser(res.data.user)
      setProducts(res.data.products)
    });
  }, []);
  
  return (
    <div>
      <h2>Account Settings</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="card edit-profile">
            <div className="card-body ">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">Manage your personal information: name, email, payment details, default shipping address, or password.</p>
              <a href="#" onClick={() => {window.location.href = "/editProfile";}} className="btn btn-primary">Edit Profile</a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div class="card edit-profile">
            <div className="card-body ">
              <h5 className="card-title">Wishlist</h5>
              <p className="card-text">View your wishlist. Add or remove items.</p>
              <a href="#" className="btn btn-primary">View Wishlist</a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body edit-profile">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">View current and previous order history.</p>
              <a href="#" className="btn btn-primary">View Orders</a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body edit-profile">
              <h5 className="card-title">Selling Account</h5>
              <p className="card-text">Manage your selling account, change items listed, details, and prices.</p>
              <a href="#" onClick={() => {window.location.href = "/sellingAccount";}} className="btn btn-primary">Selling Account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Profile;