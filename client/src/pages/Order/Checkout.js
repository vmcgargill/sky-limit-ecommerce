import React from "react"
// import API from "../../utils/API";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "../../components/Order/CheckoutForm"
import "./Checkout.css"
import {loadStripe} from '@stripe/stripe-js';

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