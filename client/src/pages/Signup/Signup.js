import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [loginLink, setLoginLink] = useState("/signup")
  let { id, redirect  } = useParams();

  useEffect(() => {
    if (redirect && id) {
      setLoginLink("/login/" + redirect + "/" + id)
    } else if (redirect) {
      setLoginLink("/login/" + redirect)
    }
  }, [id, redirect])

  const handleSignup = (event) => {
    event.preventDefault();
    API.Signup(name, email, password).then((response) => {
      if (response.status === 200) {
        API.Login(email, password).then(res => {
          if (res.status === 200) {
            if (redirect && id) {
              window.location.href = "/" + redirect + "/" + id
            } else if (redirect) {
              window.location.href = "/" + redirect
            } else {
              window.location.href = "/";
            }
          }
        })
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
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-12">
        <h2>Sign Up Form</h2>
        <form className="signup" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name-input" >Name</label>
            <input type="text" className="form-control" id="name-input" placeholder="Name" value={name} onChange={handleNameChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="email-input">Email address</label>
            <input type="email" className="form-control" id="email-input" placeholder="Email" value={email} onChange={handleEmailChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password-input" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
          </div>
          <button type="submit" className="btn btn-default">Sign Up</button>
        </form>
        <br />
        <p>Or log in <Link to={loginLink}>here</Link></p>
      </div>
</div>
  );
}

export default Signup;