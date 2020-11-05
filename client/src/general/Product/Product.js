import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Product() {
  let { id } = useParams();
  const [name, seName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  axios({
    method: "get",
    url: "/api/product/" + id
  }).then(function(response) {
    console.log(response.data)
    seName(response.data.name)
    setCategory(response.data.category)
    setPrice(response.data.price)
    setDescription(response.data.description)
  });
  

  return (
    <div class="row">
      <div class="col" id="BlogList">
        <div class="card blogSearch">
          <div class="card-body">
            <h2 class="card-title"><a>{name}</a></h2>
            <a href="#">Seller will go here</a>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Category: <a>{category}</a></li>
            <li class="list-group-item">Price: $<a id="BlogMood">{price}</a></li>
          </ul>
          <div class="card-body">
            <pre class="card-text">{description}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;