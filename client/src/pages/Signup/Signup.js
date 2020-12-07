import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import Error from "../../components/Error/Error"

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [loginLink, setLoginLink] = useState("/signup")
  const [error, setError] = useState("");
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

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setError(<Error message="Error: Name, email, and password fields cannot be left blank."/>)
    } else if (password.length < 8) {
      setError(<Error message="Error: Password must be at least 8 characters long."/>)
    } else {
      API.Signup(name, email, password).then((response) => {
        if (response.data.error) {
          setError(<Error message={"Error: " + response.data.error}/>)
        } else if (response.data.status === 200) {
          API.Login(email, password).then(res => {
            if (res.data.status === 200) {
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
      }).catch(() => {
        setError(<Error message="There was a problem registering your acount. Please check your name, email, and password and try again."/>)
      })
    }


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
          <button type="submit" className="btn btn-success">Sign Up</button>
        </form>
        <br />
        {error}
        <p>Or log in <Link className="login" to={loginLink}>here</Link></p>
      </div>
</div>
  );
}

export default Signup;