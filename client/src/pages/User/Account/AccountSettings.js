import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import './Account.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [cardText, setCardText] = useState("");
  const [merchant, setMerchant] = useState(true);

  const SellingAccount = () => {
    if (merchant) {
      window.location.href = "/sellingAccount";
    } else {
      window.location.href = "/postProduct";
    }
  }
  
  useEffect(() => {
    
    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/accountSettings"
      }
      if (res.data.user) {
        setUser(res.data.user)
        if (res.data.products.length > 0) {
          setCardText("Manage your selling account. Change items listed, details, and prices.")
        } else {
          setMerchant(false)
          setCardText("Create a selling account to sell your own products.");
        }
      }
    });
  }, []);

  return (
    <div>
      <h2>Account Settings for {user.name}</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="card edit-profile">
            <div className="card-body ">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">Manage your personal information: name, email, payment details, default shipping address, or password.</p>
              <button onClick={() => {window.location.href = "/editProfile";}} className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body edit-profile">
              <h5 className="card-title">Selling Account</h5>
              <p className="card-text">{cardText}</p>
              <button onClick={SellingAccount} className="btn btn-primary">Selling Account</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body edit-profile">
              <h5 className="card-title">Reviews</h5>
              <p className="card-text">Manage all of your customer reviews.</p>
              <button onClick={() => {window.location.href = "/customerReviews"}} className="btn btn-primary">Edit Reviews</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body edit-profile">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">View current and previous order history.</p>
              <button onClick={() => {window.location.href = "/orders"}} className="btn btn-primary">View Orders</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body edit-profile">
              <h5 className="card-title">View Cart</h5>
              <p className="card-text">View your current cart.</p>
              <button onClick={() => {window.location.href = "/cart"}} className="btn btn-primary">View Cart</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card edit-profile">
            <div className="card-body ">
              <h5 className="card-title">Wishlist</h5>
              <p className="card-text">View your wishlist. Add or remove items.</p>
              <button onClick={() => {window.location.href = "/wishList";}} className="btn btn-primary">View Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Profile;