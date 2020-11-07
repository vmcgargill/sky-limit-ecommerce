import React, { useState, useEffect } from "react";

const EditProfile = () => {

  return(
    <div>
      <div class="card text-center">
        <div class="card-header">
          <h2>Edit Profile</h2>
        </div>
        <div class="card-body">
          <h5 class="card-title">Email</h5>
          <p class="card-text">example@email.com</p>
          <a href="#" class="btn btn-primary">Edit Email</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Password</h5>
          <p class="card-text">********</p>
          <a href="#" class="btn btn-primary">Edit Password</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">Example name</p>
          <a href="#" class="btn btn-primary">Edit Name</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Phone</h5>
          <p class="card-text">303-555-5555</p>
          <a href="#" class="btn btn-primary">Edit Phone Number</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Default Shipping Address</h5>
          <p class="card-text">800 S Main St, 80202 Denver CO</p>
          <a href="#" class="btn btn-primary">Change Default Address</a>
        </div>
        <div class="card-body">
          <h5 class="card-title">Payment Methods</h5>
          <p class="card-text">Default Payment Method:</p>
          <p class="card-text">Visa Card xxxx-xxxx-xxxx-1234</p>
          <a href="#" class="btn btn-primary">Manage Payment Methods</a>
        </div>
      </div>
    </div>
  )

}

export default EditProfile;