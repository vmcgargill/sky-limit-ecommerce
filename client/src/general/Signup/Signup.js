import React, { useState } from "react";
import axios from "axios";
import LoginUser from "../Login/LoginUser"

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/signup", 
      data: {
      name: name,
      email: email,
      password: password
    }}).then(function(response) {
      if (response.status === 200) {
        LoginUser(email, password)
      }
    }).catch(function(err) {
      console.log(err)
    })
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassowrd(event.target.value)
  }

  return (
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h2>Sign Up Form</h2>
        <form class="signup" onSubmit={handleSignup}>
          <div class="form-group">
            <label for="name-input" >Name</label>
            <input type="text" class="form-control" id="name-input" placeholder="Name" value={name} onChange={handleNameChange}></input>
          </div>
          <div class="form-group">
            <label for="email-input">Email address</label>
            <input type="email" class="form-control" id="email-input" placeholder="Email" value={email} onChange={handleEmailChange}></input>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password-input" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
          </div>
          <button type="submit" class="btn btn-default">Sign Up</button>
        </form>
        <br />
        <p>Or log in <a href="/login">here</a></p>
      </div>
</div>
  );
}

export default Signup;