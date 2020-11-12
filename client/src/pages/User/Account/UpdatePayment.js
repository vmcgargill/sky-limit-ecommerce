import React, { useEffect } from "react";
import API from "../../../utils/API";

const UpdatePayment = () => {

  const addPaymentMethod = () => {

  }

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
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card edit-profile">
            <div className="card-body">
              <button onClick={addPaymentMethod} className="btn btn-primary">Add Payment Method</button>
            </div>
            <div className="card-body">
              <table class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Card</th>
                    <th scope="col">Expiration Date</th>
                    <th scope="col">Default Payment</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Visa Card Ending 1234</th>
                    <td>04/24</td>
                    <td>Yes</td>
                    <td>
                      <button className="btn btn-success">Update</button>
                      <button className="btn btn-danger">Remove</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Visa Card Ending 7654</th>
                    <td>08/26</td>
                    <td>No</td>
                    <td>
                      <button className="btn btn-success">Update</button>
                      <button className="btn btn-danger">Remove</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdatePayment;