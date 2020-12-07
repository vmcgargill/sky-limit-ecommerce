import React from "react";
import { Link } from "react-router-dom"
import USDformatter from "../../USDformatter"

const OrderDetail = ({order}) => {
  const total = order.total
  const date = new Date(order.purchaseDate).toString();

  const orderDetails = order.products.map(product => {
    return (
      <div className="card-body" key={product.productId}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4">
              {product.originalName}
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <Link className="item" to={"/product/" + product.productId}>View Item</Link>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              {USDformatter.format(product.buyPrice / 100)}
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div>
      {orderDetails}
      <div className="card-body">
        Grand Total: {USDformatter.format(total / 100)}
        <p className="card-text"><small className="text-muted">Order Placed on {date}</small></p>
      </div>
    </div>
  )
}

export default OrderDetail;