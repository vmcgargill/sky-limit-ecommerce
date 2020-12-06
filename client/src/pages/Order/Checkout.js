import React from "react"
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "../../components/Order/CheckoutForm"
import {loadStripe} from '@stripe/stripe-js';
import "./Checkout.css"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {

  return (
    <div>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
    </div>
  )
}

export default Checkout;