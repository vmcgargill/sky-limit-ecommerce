import React, { useEffect, useState } from "react";
import API from "../../../utils/API";

const UpdateEmail = () => {
  const [email, setEmail] = useState ("");

  useEffect(() => {
    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/updateEmail"
      }
      if (res.data.user) {
        setEmail(res.data.user.email);
      }
    })
  }, [])

  const updateEmail = () => {
    const data = {email: email}
    API.updateUserProfile(data).then(res => {
      if (res.data.message) {
        window.location.href = "/editProfile/msg=email"
      }
    })
  }

  return (
    <div>
      <h2>Update Email</h2>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card edit-profile mainCard">
            <div className="card-body">
              <input placeholder="Enter Name" type="email" className="form-control" maxLength="50" value={email} onChange={(ev) => {setEmail(ev.target.value)}}></input><br/>
              <button onClick={updateEmail} className="btn btn-primary">Update Email</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdateEmail;