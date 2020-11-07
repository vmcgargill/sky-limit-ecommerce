import React, { useState, useEffect } from "react";
import axios from "axios";
import ConvertImage from '../../ConvertImage'
import './User.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const removeCart = (event) => {
    axios({
      method: "put",
      url: "/api/removeCart/" + event.target.value
    }).then(function() {
      window.location.reload();
    })
  }

  const placeOrder = (event) => {
    const orderCart = event.target.value;
    console.log(orderCart);
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/userCart"
    }).then(function(response) {
      console.log(response.data.products)
      setCart(response.data.products)
    })
  }, [])

  const cartItems = cart.map((product) => 
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src={"data:image/jpeg;base64," + ConvertImage(product.image.data.data)} class="card-img merchantListImg" alt="..."></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">${product.price}</p>
            <p class="card-text"><a class="merchantDescription">{product.description}</a></p>
            <p class="card-text"><small class="text-muted">Added to wishlist 10 days ago.</small></p>
          </div>
        </div>
      </div>
      <button class="btn btn-danger merchantBtn" value={product._id} onClick={removeCart}>Remove from Cart</button>
    </div>
  );

  return (
    <div className="container">
      {cartItems}
      <button class="btn btn-primary merchantBtn" value={cart} onClick={placeOrder}>Place Order</button>
    </div>
  )

}

export default Cart;