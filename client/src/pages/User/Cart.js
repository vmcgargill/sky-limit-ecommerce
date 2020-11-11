import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState("");

  const removeCart = (id) => {
    API.removeCart(id).then(function() {
      LoadCart();
    })
  }

  const placeOrder = (orderCart) => {
    console.log("Order has been placed: " + orderCart);
  }

  const LoadCart = () => {
    API.loadCart().then(res => {
      if (res.data.products) {
        if (res.data.products.length === 0) {
          setCart([]);
          setOrder(<h5>Your cart is currently empty.</h5>);
        } else {
          setCart(res.data.products);
          setOrder(<button className="btn btn-primary merchantBtn" onClick={() => {placeOrder(cart)}}>Place Order</button>);
        }
      }
    });
  }
  
  const cartItems = cart.map((product) => {
    let productImg = "";

    if (product.image === undefined) {
      productImg = "/Default.jpg";
    } else {
      productImg = "data:image/jpeg;base64," + ConvertImage(product.image.data.data);
    }

    return (
      <div className="card mb-3" key={product._id}>
        <div className="row no-gutters">
          <div className="col-md-4">
          <div className="imageDiv"><img src={productImg} className="card-img cartListImg" alt="..."></img></div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
              <p className="card-text merchantDescription">{product.description}</p>
              <p className="card-text"><small className="text-muted">Added to cart 10 days ago.</small></p>
              <button className="btn btn-danger merchantBtn" onClick={() => {removeCart(product._id)}}>Remove from Cart</button>
            </div>
          </div>
        </div>
      </div>
    )
  });

  useEffect(LoadCart, [])

  return (
    <div className="container">
      <h2>Cart</h2>
      {cartItems}
      <h5>Cart Total: $100</h5>
      {order}
    </div>
  )

}

export default Cart;