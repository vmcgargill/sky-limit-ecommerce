import React, { useEffect } from "react";
import API from "../../../utils/API";

const UpdateAddress = () => {

  useEffect(() => {
    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/updateAddress"
      }
      if (res.data.user) {
      }
    })
  }, [])

  return (
    <div>
      <h2>Update Addresses</h2>
      
    </div>
  )

}

export default UpdateAddress;