import React from "react";
import { Link } from "react-router-dom"

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
              <Link to={"/product/" + product.productId}>View Item</Link>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              ${product.buyPrice}
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
        Grand Total: ${total}
        <p className="card-text"><small className="text-muted">Order Placed on {date}</small></p>
      </div>
    </div>
  )
}

export default OrderDetail;