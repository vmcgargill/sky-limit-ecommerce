import React, { useState } from "react";
import API from "../../utils/API";
import { useParams } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  let { redirect } = useParams();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(redirect)
    API.Login(email, password).then(res => {
      console.log(res)
      if (res.data.status === 200) {
        if (redirect) {
          window.location.href = "/" + redirect;
        } else {
          window.location.href = "/";
        }
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
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-12">
        <h2>Login Form</h2>
        <form className="login" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="email-input" placeholder="Email" value={email} onChange={handleEmailChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password-input" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
          </div>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
        <br/>
        <p>Or sign up <a href="/signup">here</a></p>
      </div>
    </div>
  );
}

export default Login;