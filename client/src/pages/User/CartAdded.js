import React, { useState, useEffect } from "react";
import ConvertImage from '../../ConvertImage';
import { useParams } from "react-router";
import API from "../../utils/API";
import './Cart.css';

const Cart = () => {
  const [name, seName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("/Default.jpg");
  let { id } = useParams();

  const removeCart = () => {
    API.removeCart(id).then(() => {
      window.location.href = "/userCart";
    });
  }

  const checkOut = () => {
    console.log("Going to checkout...");
  }

  useEffect(() => {
    // TODO: Change this API call to get updated cart.
    API.getProduct(id).then(res => {
      if (res.data === 401) {
        window.location.href = "/login/userCart"
      }
      const product = res.data.product;
      seName(product.name)
      setPrice(product.price)
      if (product.image) {
        setImage("data:image/jpeg;base64," + ConvertImage(product.image.data.data))
      } else {
        setImage("/Default.jpg")
      }
    });
  }, [id])

  return (
    <div className="container cartAdded">
      <h2>Item has been added to cart.</h2><br/>
      <h5>{name}</h5><br/>
      <h5>$ {price}</h5>
      <div className="cartAdded"><img className="productImg" alt="..." src={image}></img></div><br/>
      <h5>New Cart Total: $1,000,000</h5><br/>
      <button className="btn btn-primary" onClick={checkOut}>Go to Checkout</button><br/><br/>
      <button className="btn btn-primary" onClick={() => {window.location.href = "/userCart"}}>Go to Cart</button><br/><br/>
      <button className="btn btn-danger" onClick={removeCart}>Remove from Cart</button>
    </div>
  )

}

export default Cart;