import React, { useState, useEffect } from "react";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import API from "../../utils/API";

const UserOrder = () => {
  const [orders, setOrders] = useState(LoadingIcon);

  useEffect(() => {
    API.getOrderHistory().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/userOrders"
      } else if (res.data.orders.length === 0) {
        setOrders(<h5>You have not yet placed any orders!</h5>)
      } else if (res.data.orders.length > 0) {
        setOrders(res.data.orders.map(order => {
          const orderDate = new Date(order.purchaseDate).toString()
          const productNameString = order.products.map(product => {
            return (
              <div>
                {product.originalName} <br/>
              </div>
            )
          })
          return (
            <div class="card">
              <div class="card-header">
                Order #{order._id}
              </div>
              <div class="card-body">
                <h5 class="card-title">Total: ${order.total}</h5>
                <p class="card-text">{productNameString}</p>
                <p className="card-text"><small className="text-muted">Order Placed on {orderDate}</small></p>
                <button class="btn btn-primary" onClick={() => {
                  console.log("View order details")
                }}>View Order details</button>
              </div>
            </div>
          )
        }))
      }
    })
  }, [])


  return (
    <div className="container">
      <h2>View User Orders Here</h2>
      {orders}
    </div>
  )

}

export default UserOrder;