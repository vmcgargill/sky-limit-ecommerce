import React from "react";

function Login() {
  return (
    <div class="row">
      <div class="col-md-6">
        <h2>Login Form</h2>
        <form class="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email-input" placeholder="Email"></input>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password-input" placeholder="Password"></input>
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