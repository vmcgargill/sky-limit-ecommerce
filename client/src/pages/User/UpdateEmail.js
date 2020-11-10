import React, { useEffect, useState } from "react";
import API from "../../utils/API";

const UpdateEmail = () => {
  const [email, setEmail] = useState ("");

  useEffect(() => {
    API.getUserProfile().then(res => {
      setEmail(res.data.user.email);
    })
  }, [])

  const updateEmail = () => {
    const data = {email: email}
    API.updateUserProfile(data).then(res => {
      window.location.href = "/editProfile"
    })
  }

  return (
    <div>
      <h2>Update Email</h2>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card edit-profile">
            <div className="card-body ">
              <input placeholder="Enter Name" type="email" className="form-control" maxlength="50" value={email} onChange={(ev) => {setEmail(ev.target.value)}}></input><br/>
              <a href="#" onClick={updateEmail} className="btn btn-primary">Update Email</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdateEmail;