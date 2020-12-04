import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import BillingDetailsForm from "./BillingDetailsForm"
// import API from "../../utils/API";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    if (!error) {
      console.log(paymentMethod)
    }

    // API.placeOrder(currentCartTotal).then(res => {
    //   if (!res.data.orderStatus) {
    //     setError(<Error message={res.data.message}/>)
    //     LoadCart()
    //   } else if (res.data.orderStatus) {
    //     window.location.href = "/confirmOrder/" + res.data.id;
    //   }
    // })

  }

  return (
    <form style={{maxWidth: "400px", margin: "0 auto"}} onSubmit={handleSubmit}>
      <label>Card</label>
      <CardElement/><br/>
      <BillingDetailsForm CancelButton={""}/>
      <button type="submit" className="btn btn-success">Submit order</button>
    </form>
  )
}

export default CheckoutForm;