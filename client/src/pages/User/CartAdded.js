import React, { useState, useEffect } from "react";
import ConvertImage from '../../ConvertImage';
import { useParams } from "react-router";
import API from "../../utils/API";
import './User.css';

const Cart = () => {
  const [name, seName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("/Default.jpg");
  let { id } = useParams();

  const removeCart = () => {
    API.removeCart(id).then(() => {
      window.location.href = "/userCart"
    })
  }

  const checkOut = () => {
    console.log("Going to checkout...")
  }

  useEffect(() => {
    API.getProduct(id).then(res => {
      const product = res.data.product;
      seName(product.name)
      setPrice(product.price)
      if (product.image) {
        setImage("data:image/jpeg;base64," + ConvertImage(product.image.data.data))
      } else {
        setImage("/Default.jpg")
      }
    });
  }, [])

  return (
    <div className="container">
      <h2>Item has been added to cart.</h2>
      {name}, {price}, <img src={image}></img>
      <button class="btn btn-primary" onClick={checkOut}>Go to Checkout</button>
      <button class="btn btn-primary" onClick={() => {window.location.href = "/userCart"}}>Go to Cart</button>
      <button class="btn btn-danger" onClick={removeCart}>Remove from Cart</button>
    </div>
  )

}

export default Cart;