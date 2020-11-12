import React, { useEffect, useState } from "react";
import CreditCardInput from 'react-credit-card-input';
import "./Account.css"
import API from "../../../utils/API";

const UpdatePayment = () => {
  const [addPaymentForm, setPaymentForm] = useState("");

  const createPaymentMethod = (event) => {
    event.preventDefault();
    const cardNumber = document.getElementById("card-number").value.replace(/\s/g, "");
    const expireDate = document.getElementById("card-expiry").value;
    const cvc = document.getElementById("cvc").value;
    const card = {
      cardNumber: parseInt(cardNumber, 10),
      last4digits: parseInt(cardNumber.toString().slice(-4), 10),
      cvc: parseInt(cvc, 10),
      expirationDate: expireDate,
      default: false
    }
    console.log(card);
    API.postPaymenyMethod(card).then(res => {
      console.log(res)
    })
  }
  
  const addPaymentMethod = () => {
    setPaymentBtn("");
    setPaymentForm(
      <form className="CardForm"><br/>
        <CreditCardInput
          cardNumberInputProps={{ value: undefined }}
          cardExpiryInputProps={{ value: undefined }}
          cardCVCInputProps={{ value: undefined }}
          fieldClassName="input" /><br/><br/>
        <button className="btn btn-success" onClick={createPaymentMethod}>Create</button><br/><br/>
        <button className="btn btn-danger" onClick={() => {
          setPaymentForm("")
          setPaymentBtn(PaymentButton)
        }}>Cancel</button>
      </form>
    );
  }
  
  const PaymentButton = (<button onClick={addPaymentMethod} className="btn btn-primary">Add Payment Method</button>)
  const [addPaymentBtn, setPaymentBtn] = useState(PaymentButton)

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
              {addPaymentBtn}
              {addPaymentForm}
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