import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const EditProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.getUserProfile().then(res => {
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
    });
  }, []);

  return(
    <div>
      <div class="card text-center">
        <div class="card-header">
          <h2>Edit Profile</h2>
        </div>
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">{user.name}</p>
          <a href="/updateName" class="btn btn-primary">Edit Name</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Email</h5>
          <p class="card-text">{user.email}</p>
          <a href="/updateEmail" class="btn btn-primary">Edit Email</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Password</h5>
          <p class="card-text">********</p>
          <a href="#" class="btn btn-primary">Edit Password</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Phone</h5>
          <p class="card-text">{user.phone}</p>
          <a href="#" class="btn btn-primary">Edit Phone Number</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Default Shipping Address</h5>
          <p class="card-text">{user.address}</p>
          <a href="#" class="btn btn-primary">Change Default Address</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Payment Methods</h5>
          <p class="card-text">Default Payment Method:</p>
          <p class="card-text">{user.payment}</p>
          <a href="#" class="btn btn-primary">Manage Payment Methods</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Delete Account</h5>
          <a href="#" class="btn btn-danger">Delete my Account</a>
        </div>
      </div>
    </div>
  )

}

export default EditProfile;