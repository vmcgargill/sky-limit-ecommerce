import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ProductList from "../Product/ProductList";
import './User.css';

const Merchant = () => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/merchant/" + id
    }).then(function(response) {
      console.log(response)
      setName(response.data.merchant.name);
      setEmail(response.data.merchant.email);
      console.log(response.data.products)
      setProductList(response.data.products)
    })
  }, [])

  return(
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title"><a>{name}</a></h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Constact Email: <a>{email}</a></li>
          </ul>
          <div className="card-body">
          <ProductList products={productList}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Merchant;