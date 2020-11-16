import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom"
import LoadingIcon from "../../components/SmallLoadingIcon/SmallLoadingIcon"
import API from "../../utils/API"

const UserOrder = () => {
  const [order, setOrder] = useState(LoadingIcon);
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");
  let { id } = useParams();

  useEffect(() => {
    API.getOrder(id).then(res => {
      if (res.data === 401) {
        window.location.href = "/login/confirmOrder/" + id
      }
      setOrder(res.data.products.map(product => {
        return (
          <div className="card-body">
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
      }))
      setTotal(res.data.total)
      const orderDate = new Date(res.data.purchaseDate)
      setDate(orderDate.toString())
    })
  }, [id])


  return (
    <div className="card">
      <div className="card-header">
        <h2>Your order has been placed.</h2>
        <h5>Order #{id}</h5>
      </div>
      {order}
      <div className="card-body">
        Grand Total: ${total}
        <p className="card-text"><small className="text-muted">Order Placed on {date}</small></p>
        <button className="btn btn-primary" onClick={() => {
          window.location.href = "/"
        }}>Continue Shopping</button>
      </div>
    </div>
  )

}

export default UserOrder;