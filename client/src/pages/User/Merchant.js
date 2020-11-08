import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProductList from "../../components/Product/ProductList";
import API from "../../utils/API";

const Merchant = () => {
  let { id } = useParams();
  const [merchant, setMerchant] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.getMerchant(id).then(res => {
      setMerchant(res.data.merchant);
      setProducts(res.data.products);
    });
  }, []);
  
  return(
    <div>
      <div class="card">
      <h5 class="card-header">Merchant</h5>
      <div class="card-body">
        <h5 class="card-title">Contact Information</h5>
        <p class="card-text">Name: {merchant.name}</p>
        <p class="card-text">Email: {merchant.email}</p>
        <a href={"mailto:" + merchant.email} class="btn btn-primary">Contact</a>
      </div>
      <div class="card-body">
        <h5 class="card-title">Overall Seller Rating</h5>
        <p class="card-text">5/5 Stars</p>
      </div>
      <div class="card-body">
          <h5 class="card-title">Current Products:</h5>
          <ProductList products={products}/>
        </div>
      </div>
    </div>
  )
}

export default Merchant;