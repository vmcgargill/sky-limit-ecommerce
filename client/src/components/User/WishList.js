import React, { useEffect, useState } from "react";
import axios from "axios";
import ConvertImage from '../../ConvertImage'
import './User.css';

const WishList = () => {
  const [products, setProducts] = useState([]);

  const addCart = () => {
    console.log("Item added to cart.")
  }

  const removeWishList = (event) => {
    axios({
      method: "put",
      url: "/api/removeWishList/" + event.target.value
    }).then(function() {
      window.location.reload();
    });
  }


  useEffect(() => {
    axios({
      method: "get",
      url: "/api/userWishlist"
    }).then(function(response) {
      setProducts(response.data.products)
      console.log(response.data.products)
    })
  }, [])

  const wishListItems = products.map((product) => 
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src={"data:image/jpeg;base64," + ConvertImage(product.image.data.data)} class="card-img merchantListImg" alt="..."></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">${product.price}</p>
            <p class="card-text"><a class="merchantDescription">{product.description}</a></p>
            <p class="card-text"><small class="text-muted">Added to wishlist 10 days ago.</small></p>
          </div>
        </div>
      </div>
      <button class="btn btn-primary merchantBtn" value={product._id} onClick={addCart}>Add to Cart</button>
      <button class="btn btn-danger merchantBtn" value={product._id} onClick={removeWishList}>Remove from Wishlist</button>
    </div>
  );

  return (
    <div className="container">
      {wishListItems}
    </div>
  );

}

export default WishList;