import React, { useEffect } from "react";
import API from "../../../utils/API";

const UpdatePayment = () => {

  useEffect(() => {
    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/updatePayment"
      }
      if (res.data.user) {
      }
    })
  }, [])

  return (
    <div>
      <h2>Update Payment Methods</h2>
    </div>
  )

}

export default UpdatePayment;