import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ConvertImage from '../../ConvertImage'
import './Product.css';

function Product() {
  let { id } = useParams();
  const [name, seName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/Default.jpg");
  const [seller, setSeller] = useState({});
  const [wishlist, SetWhishlist] = useState("")
  
  const addCart = () => {
    axios({
      method: "post",
      url: "/api/addCart/" + id
    }).then(function() {
      window.location.href = "/cartAdded/" + id
    });
  }
  
  const addWishList = () => {
    axios({
      method: "post",
      url: "/api/wishList/" + id
    }).then(function() {
      SetWhishlist(btnRemoveWishlist)
    });
  }
  
  const removeWishList = () => {
    axios({
      method: "put",
      url: "/api/removeWishList/" + id
    }).then(function() {
      SetWhishlist(btnAddWishList)
    });
  }

  const btnAddWishList = (<a href="#" onClick={addWishList} class="btn btn-primary">Add to wishlist</a>);
  const btnRemoveWishlist = (<a href="#" onClick={removeWishList} class="btn btn-primary">Remove From Wishlist</a>);
  
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/product/" + id
    }).then(function(response) {
      const product = response.data.product;
      seName(product.name)
      setCategory(product.category)
      setPrice(product.price)
      setDescription(product.description)
      setSeller(product.seller)
      if (product.image) {
        setImage("data:image/jpeg;base64," + ConvertImage(product.image.data.data))
      } else {
        setImage("/Default.jpg")
      }
      if (response.data.signedin) {
        if (response.data.wishlist) {
          SetWhishlist(btnRemoveWishlist)
        } else {
          SetWhishlist(btnAddWishList)
        }
      }
    });
  }, [])
  
  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title"><a>{name}</a></h2>
            <img src={image} className="card-img-top productImg" alt='ProductImage'/>
            <a href={"/merchant/" + seller._id}>Seller: {seller.name}</a>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: <a>{category}</a></li>
            <li className="list-group-item">Price: $<a>{price}</a></li>
          </ul>
          <div className="card-body">
            <pre className="card-text">{description}</pre>
          </div>
          <div className="card-body">
            <a href="#" onClick={addCart} class="btn btn-primary">Add to Cart</a><br/><br/>
            {wishlist}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;