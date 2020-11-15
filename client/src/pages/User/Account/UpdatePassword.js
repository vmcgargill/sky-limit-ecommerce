import React, { useState } from "react";
import API from "../../../utils/API";
import Error from "../../../components/Error/Error";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState ("");
  const [password1, setPassword1] = useState ("");
  const [password2, setPassword2] = useState ("");
  const [error, setError] = useState("");

  const updatePassword = () => {
    if (password1 !== password2) {
      setError(<Error message={"Passwords do not match"}/>)
    } else {
      API.updatePassword({oldPassword: currentPassword, newPassword: password2}).then(res => {
        if (res.data === 401) {
          window.location.href = "/login/updatePassword"
        }
        if (res.status === 200) {
          window.location.href = "/editProfile/msg=password";
        }
      }).catch(() => {
        setError(<Error message={"Wrong password"}/>)
      });
    }
  }

  const comparePassword = (event) => {
    setPassword2(event.target.value);
    if (password1 !== event.target.value) {
      setError(<Error message={"Passwords do not match"}/>)
    } else {
      setError("")
    }
  }

  return (
    <div>
      <h2>Update Password</h2>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card edit-profile">
            <div className="card-body ">
              <label for="exampleInputPassword1">Enter Current Password:</label>
              <input placeholder="Enter Current Password" type="password" className="form-control" maxLength="50" 
              value={currentPassword} onChange={(ev) => {setCurrentPassword(ev.target.value)}}></input><br/>
              <label for="exampleInputPassword1">Enter New Password:</label>
              <input placeholder="Enter New Password" type="password" className="form-control" maxLength="50" 
              value={password1} onChange={(ev) => {setPassword1(ev.target.value)}}></input><br/>
              <label for="exampleInputPassword1">Confirm New Password:</label>
              <input placeholder="Confirm New Password" type="password" className="form-control" maxLength="50" 
              value={password2} onChange={comparePassword}></input><br/>
              <button onClick={updatePassword} className="btn btn-primary">Update Password</button><br/>
              {error}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdatePassword;