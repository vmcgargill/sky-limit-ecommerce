import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import './User.css';

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [wishlistMsg, setWishListMsg] = useState("");
  const [load, setLoad] = useState(LoadingIcon);

  useEffect(() => {
    const LoadWishlist = () => {
      API.loadWishlist().then((res) => {
        if (res.data === 401) {
          window.location.href = "/login/wishList"
        }
        if (res.data.products) {
          if (res.data.products.length === 0) {
            setProducts("");
            setLoad("")
            setWishListMsg(<h5>Your wishlist is currently empty.</h5>);
          } else {
            setWishListMsg("");
            const wishListItems = res.data.products.map((product) => {
              let productImg = "";
              if (product.image === undefined) {
                productImg = "/Default.jpg";
              } else {
                productImg = "data:image/jpeg;base64," + ConvertImage(product.image.data.data);
              }
              return (
              <div className="card mb-3" key={product._id}>
                <div className="row">
                  <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="imageDiv"><img src={productImg} className="card-img merchantListImg" alt="..."></img></div>
                  </div>
                  <div className="col-sm-12 col-md-8 col-lg-8">
                    <div className="card-body wishlistBody">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                      <p className="card-text wishlistDescription">{product.description}</p>
                      <p className="card-text"><small className="text-muted">Added to wishlist 10 days ago.</small></p>
                      <button className="btn btn-primary" onClick={() => {
                        API.addCart(product._id).then(() => {
                          window.location.href = "/cartAdded/" + product._id
                        });
                      }}>Add to Cart</button><br/><br/>
                      <button className="btn btn-primary" onClick={() => {
                          window.location.href = "/product/" + product._id
                        }}>View Item</button><br/><br/>
                      <button className="btn btn-danger" onClick={() => {
                        API.removeWishlist(product._id).then(() => {
                          LoadWishlist();
                        });
                      }}>Remove from Wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            );
            setLoad("")
            setProducts(wishListItems);
          }
        }
      })
    }
    LoadWishlist();
  }, [])

  return (
    <div className="container">
      <h2>Wishlist</h2>
      {load}
      {products}
      {wishlistMsg}
    </div>
  );

}

export default WishList;