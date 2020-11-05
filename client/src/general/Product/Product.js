import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Product() {
  let { id } = useParams();
  const [name, seName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/product/" + id
    }).then(function(response) {
      // console.log(response.data)
      seName(response.data.name)
      setCategory(response.data.category)
      setPrice(response.data.price)
      setDescription(response.data.description)
      // setImage(response.data.image)
      console.log(response.data.image.data)
    });
  }, [])
  

  return (
    <div className="row">
      <div className="col" id="BlogList">
        <div className="card blogSearch">
          <div className="card-body">
            <h2 className="card-title"><a>{name}</a></h2>
            <a href="#">Seller will go here</a>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: <a>{category}</a></li>
            <li className="list-group-item">Price: $<a id="BlogMood">{price}</a></li>
          </ul>
          <div className="card-body">
            <pre className="card-text">{description}</pre>
          </div>
          {image}
        </div>
      </div>
    </div>
  );
}

export default Product;