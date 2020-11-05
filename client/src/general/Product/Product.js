import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import './Product.css';

function Product() {
  let { id } = useParams();
  const [name, seName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  function converImg(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((byte) => binary += String.fromCharCode(byte));
    return window.btoa(binary);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/product/" + id
    }).then(function(response) {
      seName(response.data.name)
      setCategory(response.data.category)
      setPrice(response.data.price)
      setDescription(response.data.description)
      setImage('data:image/jpeg;base64,' + converImg(response.data.image.data.data))
    });
  }, [])
  

  return (
    <div className="row">
      <div className="col" id="BlogList">
        <div className="card blogSearch">
          <div className="card-body">
            <h2 className="card-title"><a>{name}</a></h2>
            <img src={image} className="card-img-top productImg" alt='Helpful alt text'/>
            <a href="#">Seller will go here</a>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: <a>{category}</a></li>
            <li className="list-group-item">Price: $<a id="BlogMood">{price}</a></li>
          </ul>
          <div className="card-body">
            <pre className="card-text">{description}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;