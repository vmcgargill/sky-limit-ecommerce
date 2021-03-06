import React, { useEffect } from "react";
import API from "../../../utils/API";

const DeleteAccount = () => {

  useEffect(() => {
    API.getUserProfile().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/deleteAccount"
      }
      if (res.data.user) {
      }
    })
  }, [])

  return (
    <div>
      <h2>Delete Account</h2>
      <h5>This feature is not available at this time.</h5>
    </div>
  )

}

export default DeleteAccount;