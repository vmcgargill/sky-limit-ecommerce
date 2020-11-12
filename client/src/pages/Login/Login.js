import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [signupLink, setSignupLink] = useState("/signup")
  let { id, redirect  } = useParams();

  useEffect(() => {
    API.Logout();
    if (redirect && id) {
      setSignupLink("/signup/" + redirect + "/" + id);
    } else if (redirect) {
      setSignupLink("/signup/" + redirect);
    }
  }, [id, redirect])

  const handleLogin = (event) => {
    event.preventDefault();
    API.Login(email, password).then(res => {
      if (res.data.status === 200) {
        if (redirect) {
          if (id) {
            window.location.href = "/" + redirect + "/" + id
          } else {
            window.location.href = "/" + redirect;
          }
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
        <p>Or sign up <Link to={signupLink}>here</Link></p>
      </div>
    </div>
  );
}

export default Login;