import React from "react"
// import API from "../../utils/API";
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

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
      <CardElement/>
      <button type="submit">Pay</button>
    </form>
  )
}

const Checkout = () => {

  return (
    <div>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <h1>Hello</h1>
        <CheckoutForm/>
      </Elements>
    </div>
  )
}

export default Checkout;