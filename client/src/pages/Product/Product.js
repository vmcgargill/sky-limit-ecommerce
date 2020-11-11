import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ConvertImage from '../../ConvertImage'
import API from "../../utils/API";
import './Product.css';

function Product() {
  let { id } = useParams();
  const [name, seName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/Default.jpg");
  const [seller, setSeller] = useState({});
  const [wishlist, SetWhishlist] = useState({
    btnName: "Wishlist", 
    onWishlist: false
  });
  
  const addCart = () => {
    API.addCart(id).then(() => {
      window.location.href = "/cartAdded/" + id
    });
  }

  const updateWishlist = () => {
    console.log(wishlist.onWishlist)
    if (wishlist.onWishlist) {
      API.removeWishlist(id).then(() => {
        SetWhishlist({btnName: "Add to Wishlist", onWishlist: true})
      });
    } else if (!wishlist.onWishlist) {
      API.addWishlist(id).then(() => {
        SetWhishlist({btnName: "Remove from Wishlist", onWishlist: false})
      });
    }
  }
  
  useEffect(() => {
    API.getProduct(id).then(response => {
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
      if (response.data.signedin && response.data.wishlist) {
        SetWhishlist({btnName: "Remove from Wishlist", onWishlist: true})
      } else {
        SetWhishlist({btnName: "Add to Wishlist", onWishlist: false})
      }
    });
  }, [id])
  
  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <img src={image} className="card-img-top productImg" alt='ProductImage'/>
            <a href={"/merchant/" + seller._id}>Seller: {seller.name}</a>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: {category}</li>
            <li className="list-group-item">Price: ${price}</li>
          </ul>
          <div className="card-body">
            <pre className="card-text">{description}</pre>
          </div>
          <div className="card-body">
            <button onClick={addCart} className="btn btn-primary">Add to Cart</button><br/><br/>
            <button onClick={updateWishlist} className="btn btn-primary">{wishlist.btnName}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;