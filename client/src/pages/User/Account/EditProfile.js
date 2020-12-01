import React, { useState, useEffect } from "react";
import { formatPhoneNumber } from 'react-phone-number-input'
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import Success from "../../../components/Success/Success"

const EditProfile = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  let { msg } = useParams();

  useEffect(() => {
    if (msg) {
      let successMsg = "";
      if (msg === "msg=name") {
        successMsg = "Name"
      } else if (msg === "msg=email") {
        successMsg = "Email"
      } else if (msg === "msg=password") {
        successMsg = "Password"
      } else if (msg === "msg=phone") {
        successMsg = "Phone"
      }
      setMessage(<Success message={successMsg + " has been succesfully changed"}/>)
    }

    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/editProfile"
      }
      if (res.data.user) {
        const userData = {}
        userData.name = res.data.user.name;
        userData.email = res.data.user.email;
        if (res.data.user.phone === undefined) {
          userData.phone = "Add phone number"
        } else {
          userData.phone = formatPhoneNumber("+" + res.data.user.phone)
        }
        if (res.data.user.address === undefined) {
          userData.address = "Add address"
        } else {
          userData.address = "Change Default Address"
        }
        setUser(userData)
      }
    });
  }, [msg]);

  return(
    <div>
      {message}
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
          <button onClick={() => {window.location.href="/updatePhone"}} className="btn btn-primary">Edit Phone Number</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Default Shipping Address</h5>
          <p className="card-text">{user.address}</p>
          <button onClick={() => {window.location.href="/updateAddress"}} className="btn btn-primary">Change Default Address</button>
        </div>
        <div className="card-body editProfileOpt">
          <h5 className="card-title">Delete Account</h5>
          <button onClick={() => {window.location.href="/deleteAccount"}} className="btn btn-danger">Delete my Account</button>
        </div>
      </div>
    </div>
  )

}

export default EditProfile;