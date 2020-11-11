import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const EditProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.getUserProfile().then(res => {
      if (res.data.user) {
        const userData = {}
        userData.name = res.data.user.name;
        userData.email = res.data.user.email;
        if (res.data.user.phone === undefined) {
          userData.phone = "Add phone number"
        }
        if (res.data.user.address === undefined) {
          userData.address = "Add address"
        }
        if (res.data.user.payment === undefined) {
          userData.payment = "Add payment method"
        }
        setUser(userData)
      }
    });
  }, []);

  return(
    <div>
      <div className="card text-center">
        <div className="card-header">
          <h2>Edit Profile</h2>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Name</h5>
          <p className="card-text">{user.name}</p>
          <button onClick={() => {window.location.href="/updateName"}} className="btn btn-primary">Edit Name</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Email</h5>
          <p className="card-text">{user.email}</p>
          <button onClick={() => {window.location.href="/updateEmail"}} className="btn btn-primary">Edit Email</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Password</h5>
          <p className="card-text">********</p>
          <button onClick={() => {window.location.href="/updatePassword"}} className="btn btn-primary">Edit Password</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Phone</h5>
          <p className="card-text">{user.phone}</p>
          <button href="#" className="btn btn-primary">Edit Phone Number</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Default Shipping Address</h5>
          <p className="card-text">{user.address}</p>
          <button href="#" className="btn btn-primary">Change Default Address</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Payment Methods</h5>
          <p className="card-text">Default Payment Method:</p>
          <p className="card-text">{user.payment}</p>
          <button href="#" className="btn btn-primary">Manage Payment Methods</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Delete Account</h5>
          <button href="#" className="btn btn-danger">Delete my Account</button>
        </div>
      </div>
    </div>
  )

}

export default EditProfile;