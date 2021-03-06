import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import USDformatter from "../../USDformatter"
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState("");
  const [checkoutBtn, setCheckoutBtn] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [load, setLoad] = useState(LoadingIcon);
  
  useEffect(() => {
    const LoadCart = () => {
      API.loadCart().then(res => {
        if (res.data === 401) {
          window.location.href = "/login/cart"
        }
        if (res.data.products) {
          if (res.data.products.length === 0) {
            setLoad("")
            setCart("");
            setCheckoutBtn(<h5>Your cart is currently empty.</h5>);
            setCartTotal("0.00");
          } else {
            const currentCartTotal = res.data.products.map(product => product.price).reduce((x, y) => x + y, 0);
            setCartTotal(currentCartTotal.toString());

            setCheckoutBtn(<button className="btn btn-primary" onClick={() => {window.location.href = "/checkout"}}>Go to Checkout</button>);
  
            const cartList = res.data.products.map((product) => {
              let productImg = "";
              if (product.image === undefined) {
                productImg = "/Default.jpg";
              } else {
                productImg = "data:image/jpeg;base64," + ConvertImage(product.image.data.data);
              }
          
              return (
                <div className="card mb-3" key={product._id}>
                  <div className="row no-gutters">
                    <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="imageDiv"><img src={productImg} className="card-img cartListImg" alt="..."></img></div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                      <div className="card-body  cartListBodyMiddle">
                        <h5 className="card-title">{product.name}</h5><br/>
                        <button className="btn btn-danger" onClick={() => {
                          API.removeCart(product._id).then(() => {
                            if (res.data === 401) {
                              window.location.href = "/login/cart"
                            } else {
                              LoadCart();
                            }
                          })
                        }}>Remove from Cart</button><br/><br/>
                        <button className="btn btn-primary" onClick={() => {
                          window.location.href = "/product/" + product._id
                        }}>View Item</button>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="card-body cartListBody">
                        <h5 className="card-title">{USDformatter.format(product.price / 100)}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              )
            });
            setLoad("")
            setCart(cartList);
          }
        } 
      });
    }

    LoadCart();

  }, [])

  return (
    <div className="container">
      <h2>Cart</h2>
      {load}
      {cart}
      <h5>Cart Total: {USDformatter.format(cartTotal / 100)}</h5>
      {checkoutBtn}
    </div>
  )

}

export default Cart;