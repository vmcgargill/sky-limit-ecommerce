import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import './User.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const removeCart = (id) => {
    API.removeCart(id).then(function() {
      LoadCart();
    })
  }

  const placeOrder = (orderCart) => {
    console.log("Order has been placed: " + orderCart);
  }

  useEffect(() => {
    LoadCart();
  }, [])

  const LoadCart = () => {
    API.loadCart().then(res => {
      setCart(res.data.products)
    })
  }

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
      <button class="btn btn-danger merchantBtn" onClick={() => {removeCart(product._id)}}>Remove from Cart</button>
    </div>
  );

  return (
    <div className="container">
      {cartItems}
      <button class="btn btn-primary merchantBtn" onClick={() => {placeOrder(cart)}}>Place Order</button>
    </div>
  )

}

export default Cart;