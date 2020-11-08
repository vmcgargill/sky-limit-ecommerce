import React, { useState } from "react";
import API from "../../utils/API";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    API.Login(email, password).then(res => {
      console.log(res)
      if (res.status === 200) {
        window.location.href = "/";
      }
    }).catch(err => {
      console.log(err)
    });
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassowrd(event.target.value)
  }

  return (
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <h2>Login Form</h2>
        <form class="login" onSubmit={handleLogin}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email-input" placeholder="Email" value={email} onChange={handleEmailChange}></input>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password-input" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
          </div>
          <button type="submit" class="btn btn-default">Login</button>
        </form>
        <br/>
        <p>Or sign up <a href="/signup">here</a></p>
      </div>
    </div>
  );
}

export default Login;