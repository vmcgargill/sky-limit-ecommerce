import {useState, useEffect} from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import BillingDetailsForm from "./BillingDetailsForm"
import API from "../../utils/API";
import Error from "../Error/Error"
import SmallLoadingIcon from "../SmallLoadingIcon/SmallLoadingIcon"

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [orderTotal, setOrderTotal] = useState("");
  const [load, setLoad] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.getElementById("submitOrder").disabled = 'true';
    setLoad(SmallLoadingIcon);

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
        const res = await API.placeOrder(id, orderTotal)
        if (res.data === 401) {
          window.location.href = "/login/checkout"
        } else if (res.data.status === 400) {
          setLoad("");
          setError(<Error message={res.data.error}/>)
          document.getElementById("submitOrder").disabled = '';
        } else if (res.data.orderStatus) {
          window.location.href = "/confirmOrder/" + res.data.id
        }
      } catch (error) {
        setLoad("");
        setError(<Error message={"Error: Payment meothod was invalid. Please try again."}/>);
        document.getElementById("submitOrder").disabled = '';
      }
    } else {
      setLoad("");
      setError(<Error message={"Error: Payment meothod was invalid. Please try again."}/>);
      document.getElementById("submitOrder").disabled = '';
    }
  }

  useEffect(() => {
    API.loadcheckout().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/checkout"
      } else {
        setOrderTotal(res.data.currentTotal);
        const defaultAddress = res.data.addresses.filter(address => address.default === true)
        if (defaultAddress.length > 0) {
          document.getElementById("name").value = defaultAddress[0].name
          document.getElementById("city").value = defaultAddress[0].city
          document.getElementById("address1").value = defaultAddress[0].addressLine1
          document.getElementById("address2").value = defaultAddress[0].addressLine2
          document.getElementById("state").value = defaultAddress[0].state
          document.getElementById("zip").value = defaultAddress[0].zip
        }
      }
    })
  }, [])

  return (
    <form style={{maxWidth: "400px", margin: "0 auto"}} onSubmit={handleSubmit}>
      <h5>Order total: ${orderTotal}</h5>
      <label>Card</label>
      <CardElement options={{hidePostalCode: true}}/><br/>
      <BillingDetailsForm CancelButton={""}/>
      {error}
      <button type="submit" className="btn btn-success" id="submitOrder">Submit order</button><br/>
      {load}
    </form>
  )
}

export default CheckoutForm;