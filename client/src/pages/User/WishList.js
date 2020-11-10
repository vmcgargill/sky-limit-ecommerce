import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import './User.css';

const WishList = () => {
  const [products, setProducts] = useState([]);

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
      setProducts(res.data.products)
      console.log(res.data.products)
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
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src={productImg} class="card-img merchantListImg" alt="..."></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">${product.price}</p>
            <p class="card-text"><a class="merchantDescription">{product.description}</a></p>
            <p class="card-text"><small class="text-muted">Added to wishlist 10 days ago.</small></p>
            <button class="btn btn-primary merchantBtn" onClick={() => {addCart(product._id)}}>Add to Cart</button>
            <button class="btn btn-danger merchantBtn" onClick={() => {removeWishList(product._id)}}>Remove from Wishlist</button>
          </div>
        </div>
      </div>
    </div>

    )}
  );

  return (
    <div className="container">
      {wishListItems}
    </div>
  );

}

export default WishList;