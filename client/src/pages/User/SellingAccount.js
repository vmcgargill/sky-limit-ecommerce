import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import './User.css';

const SellingAccount = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.getMerchantProducts().then(res => {
      if (res.data.products) {
        setProducts(res.data.products)
      }
    })
  }, [])

  const merchantItems = products.map((product) => {
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
          <div className="imageDiv"><img src={productImg} className="card-img" alt="..."></img></div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
              <p className="card-text merchantDescription">{product.description}</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              <button className="btn btn-primary merchantBtn" onClick={() => {window.location.href = "/editProduct/" + product._id;}}>Edit Product</button>
              <button className="btn btn-danger merchantBtn" onClick={() => {window.location.href = "/deleteProduct/" + product._id;}}>Delete Product</button>
            </div>
          </div>
        </div>
      </div>
    )}
  );

  return (
    <div className="container">
      {merchantItems}
    </div>
  );
}

export default SellingAccount;