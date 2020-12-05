import {useState} from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import BillingDetailsForm from "./BillingDetailsForm"
import API from "../../utils/API";
import Error from "../Error/Error"

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const billingDetails = {
      name: document.getElementById("name").value,
      address: {
        city: document.getElementById("city").value, 
        line1: document.getElementById("address1").value,
        line2: document.getElementById("address2").value,
        state: document.getElementById("state").value,
        postal_code: document.getElementById("zip").value
      }
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    })

    if (!error) {
      const {id} = paymentMethod;
      try {
        const res = await API.placeOrder(id)
        if (res.data === 401) {
          window.location.href = "/login/checkout"
        } else if (res.data === 400) {
          setError(<Error message={"Error: Payment meothod was invalid. Please try again."}/>)
        } else if (res.data.orderStatus) {
          window.location.href = "/confirmOrder/" + res.data.id
        }
      } catch (error) {
        setError(<Error message={"Error: Payment meothod was invalid. Please try again."}/>)
      }
    }

  }

  const cardOptions = {
    hidePostalCode: true
  }

  return (
    <form style={{maxWidth: "400px", margin: "0 auto"}} onSubmit={handleSubmit}>
      <label>Card</label>
      <CardElement options={cardOptions}/><br/>
      <BillingDetailsForm CancelButton={""}/>
      {error}
      <button type="submit" className="btn btn-success">Submit order</button>
    </form>
  )
}

export default CheckoutForm;