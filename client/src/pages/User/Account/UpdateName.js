import React, { useEffect, useState } from "react";
import API from "../../../utils/API";

const UpdateName = () => {
  const [name, setName] = useState ("");

  useEffect(() => {
    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/updateName"
      }
      if (res.data.user) {
        setName(res.data.user.name);
      }
    })
  }, [])

  const updateName = () => {
    const data = {name: name}
    API.updateUserProfile(data).then(res => {
      if (res.data.message) {
        window.location.href = "/editProfile/msg=name"
      }
    })
  }

  return (
    <div>
      <h2>Update Name</h2>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card edit-profile">
            <div className="card-body">
              <input placeholder="Enter Name" type="text" className="form-control" maxLength="50" value={name} onChange={(ev) => {setName(ev.target.value)}}></input><br/>
              <button onClick={updateName} className="btn btn-primary">Update Name</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdateName;