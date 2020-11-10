import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import './User.css';

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [wishlistMsg, setWishListMsg] = useState("");

  const addCart = (id) => {
    API.addCart(id).then(() => {
      window.location.href = "/cartAdded/" + id
    });
  }

  const removeWishList = (id) => {
    API.removeWishlist(id).then(() => {
      LoadWishlist();
    });
  }

  useEffect(() => {
    LoadWishlist();
  }, [])

  const LoadWishlist = () => {
    API.loadWishlist().then((res) => {
      if (res.data.products.length === 0) {
        setProducts([]);
        setWishListMsg(<h5>Your wishlist is currently empty.</h5>);
      } else {
        setProducts(res.data.products);
        setWishListMsg("");
      }
    })
  }

  const wishListItems = products.map((product) => {
    let productImg = "";

    if (product.image === undefined) {
      productImg = "/Default.jpg";
    } else {
      productImg = "data:image/jpeg;base64," + ConvertImage(product.image.data.data);
    }

    return (
    <div className="card mb-3" key={product._id}>
      <div className="row no-gutters">
        <div className="col-md-4">
        <div className="imageDiv"><img src={productImg} className="card-img merchantListImg" alt="..."></img></div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">${product.price}</p>
            <p className="card-text merchantDescription">{product.description}</p>
            <p className="card-text"><small className="text-muted">Added to wishlist 10 days ago.</small></p>
            <button className="btn btn-primary merchantBtn" onClick={() => {addCart(product._id)}}>Add to Cart</button>
            <button className="btn btn-danger merchantBtn" onClick={() => {removeWishList(product._id)}}>Remove from Wishlist</button>
          </div>
        </div>
      </div>
    </div>

    )}
  );

  return (
    <div className="container">
      <h2>Wishlist</h2>
      {wishListItems}
      {wishlistMsg}
    </div>
  );

}

export default WishList;