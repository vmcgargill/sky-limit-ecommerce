import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import API from "../../../utils/API";
import "./Account.css"

const UpdatePhone = () => {
  const [phone, setPhone] = useState ("");

  useEffect(() => {
    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/updatePhone"
      }
    })
  }, [])

  const updatePhone = () => {
    const data = {phone: phone.phone}
    API.updateUserProfile(data).then(res => {
      if (res.data.message) {
        window.location.href = "/editProfile/msg=phone"
      }
    })
  }

  return (
    <div>
      <h2>Update Phone Number</h2>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card edit-profile">
            <div className="card-body">
              <div className="PhoneInput">
                <PhoneInput
                  country={'us'}
                  defaultCountry="US"
                  onChange={phone => {setPhone({ phone })}}
                />
              </div><br/>
              <button onClick={updatePhone} className="btn btn-primary">Update Phone</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdatePhone;