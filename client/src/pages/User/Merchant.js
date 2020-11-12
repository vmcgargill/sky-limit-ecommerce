import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProductList from "../../components/Product/ProductList";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import API from "../../utils/API";
import "./User.css";

const Merchant = () => {
  let { id } = useParams();
  const [merchant, setMerchant] = useState({});
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(LoadingIcon);

  useEffect(() => {
    API.getMerchant(id).then(res => {
      setLoad("")
      setMerchant(res.data.merchant);
      if (res.data.products) {
        setProducts(res.data.products);
      } else {
        setProducts(<p className="card-text">User does no currently have any products.</p>);
      }
    });
  }, [id]);
  
  return(
    <div>
      <div className="card">
      <h5 className="card-header">Merchant</h5>
      <div className="card-body merchantCard">
        <h5 className="card-title">Contact Information</h5>
        <p className="card-text">Name: {merchant.name}</p>
        <p className="card-text">Email: {merchant.email}</p>
        <a href={"mailto:" + merchant.email} className="btn btn-primary">Contact</a>
      </div>
      <div className="card-body merchantCard">
        <h5 className="card-title">Overall Seller Rating</h5>
        <p className="card-text">5/5 Stars</p>
      </div>
      <div className="card-body">
          <h5 className="card-title">Current Products:</h5>
          {load}
          <ProductList products={products}/>
        </div>
      </div>
    </div>
  )
}

export default Merchant;