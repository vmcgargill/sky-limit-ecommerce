import React, { useState, useEffect } from "react";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import API from "../../utils/API";
import USDformatter from "../../USDformatter"

const UserOrder = () => {
  const [orders, setOrders] = useState(LoadingIcon);

  useEffect(() => {
    API.getOrderHistory().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/orders"
      } else if (res.data.orders.length === 0) {
        setOrders(<h5>You have not yet placed any orders!</h5>)
      } else if (res.data.orders.length > 0) {
        setOrders(res.data.orders.map(order => {
          const orderDate = new Date(order.purchaseDate).toString()
          const productNameString = order.products.map(product => {
            return (
              <p className="card-text" key={product.productId}>{product.originalName}<br/></p>
            )
          })
          return (
            <div className="card" key={order._id}>
              <div className="card-header">
                <h5 className="card-title">Order #{order._id}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{productNameString}</p>
                <p className="card-text">Total: {USDformatter.format(order.total / 100)}</p>
                <p className="card-text"><small className="text-muted">Order Placed on {orderDate}</small></p>
                <button className="btn btn-primary" onClick={() => {
                  window.location.href = "/order/" + order._id
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