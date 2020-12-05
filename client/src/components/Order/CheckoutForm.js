import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import BillingDetailsForm from "./BillingDetailsForm"
import API from "../../utils/API";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

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
        console.log(res)
      } catch (error) {
        console.log(error)
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
      <button type="submit" className="btn btn-success">Submit order</button>
    </form>
  )
}

export default CheckoutForm;