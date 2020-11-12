import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import './User.css';

const SellingAccount = () => {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(LoadingIcon);

  useEffect(() => {
    API.getMerchantProducts().then(res => {
      if (res.data.products) {
        setLoad("")
        setProducts(res.data.products)
      } else {
        window.location.href = "/login/sellingAccount"
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
          <div className="col-sm-12 col-md-4 col-lg-4">
          <Link to={"/product/" + product._id}><div className="imageDiv"><img src={productImg} className="card-img" alt="..."></img></div></Link>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-8">
            <div className="card-body SellingListBody">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
              <p className="card-text merchantDescription">{product.description}</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              <button className="btn btn-primary merchantBtn" onClick={() => {window.location.href = "/editProduct/" + product._id;}}>Edit Product</button><br/><br/>
              <button className="btn btn-danger merchantBtn" onClick={() => {window.location.href = "/deleteProduct/" + product._id;}}>Delete Product</button>
            </div>
          </div>
        </div>
      </div>
    )}
  );

  return (
    <div className="container">
      <h2>Selling Account</h2>
      {load}
      {merchantItems}
    </div>
  );
}

export default SellingAccount;