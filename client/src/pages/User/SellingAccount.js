import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import './User.css';

const SellingAccount = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.getMerchantProducts().then(res => {
      setProducts(res.data.products)
    })
  }, [])

  const merchantItems = products.map((product) => 
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src={"data:image/jpeg;base64," + ConvertImage(product.image.data.data)} class="card-img merchantListImg" alt="..."></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">${product.price}</p>
            <p class="card-text"><a class="merchantDescription">{product.description}</a></p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
      <button class="btn btn-primary merchantBtn" onClick={() => {window.location.href = "/editProduct/" + product._id;}}>Edit Product</button>
      <button class="btn btn-danger merchantBtn" onClick={() => {window.location.href = "/deleteProduct/" + product._id;}}>Delete Product</button>
    </div>
  );

  return (
    <div className="container">
      {merchantItems}
    </div>
  );
}

export default SellingAccount;