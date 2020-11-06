import React, { useState, useEffect } from "react";
import User from "./User";
import { useParams } from "react-router";
import ProductList from "../Product/ProductList";
import axios from "axios";

const Merchant = () => {
  let { id } = useParams();
  const [merchant, setMerchant] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/merchant/" + id
    }).then(function(response) {
      setMerchant(response.data.merchant);
      setProducts(response.data.products);
    });
  }, []);
  
  return(
    <div>
      <User user={merchant}/>
      <ProductList products={products}/>
    </div>
  )
}

export default Merchant;