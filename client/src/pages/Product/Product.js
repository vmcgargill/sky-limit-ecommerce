import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom"
import ConvertImage from '../../ConvertImage'
import API from "../../utils/API";
import Success from "../../components/Success/Success"
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import './Product.css';

function Product() {
  let { id } = useParams();
  const [message, setMessage] = useState("")
  const [name, seName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState({});
  const [load, setLoad] = useState(LoadingIcon);
  const [wishlist, SetWhishlist] = useState({
    btnName: "Wishlist", 
    onWishlist: false
  });
  const [cart, SetCart] = useState({
    btnName: "Cart", 
    onCart: false
  });
  
  const updateCart = (event) => {
    console.log(event.target.value)
    console.log(cart.onCart) 
    if (cart.onCart) {
      API.removeCart(id).then(() => {
        setMessage(<Success message={"Removed from Cart"}/>)
        return SetCart({btnName: "Add to Cart", onCart: false})
      })
    } else if (!cart.onCart) {
      API.addCart(id).then(() => {
        window.location.href = "/cartAdded/" + id
      });
    }
  }

  const updateWishlist = () => {
    console.log(wishlist.onWishlist)
    if (wishlist.onWishlist) {
      API.removeWishlist(id).then(() => {
        SetWhishlist({btnName: "Add to Wishlist", onWishlist: false})
        setMessage(<Success message={"Removed from Wishlist"}/>)
      });
    } else if (!wishlist.onWishlist) {
      API.addWishlist(id).then(() => {
        SetWhishlist({btnName: "Remove from Wishlist", onWishlist: true})
        setMessage(<Success message={"Added to Wishlist"}/>)
      });
    }
  }
  
  useEffect(() => {
    API.getProduct(id).then(response => {
      const product = response.data.product;
      if (!product.seller) {
        window.location.href = "/404"
      } else if (response.data.product) {
        seName(product.name)
        setCategory(product.category)
        setPrice(product.price)
        setDescription(product.description)
        setSeller(product.seller)
        setLoad("")
        if (product.image) {
          setImage("data:image/jpeg;base64," + ConvertImage(product.image.data.data))
        } else {
          setImage("/Default.jpg")
        }
        if (response.data.signedin) {
          if (response.data.wishlist) {
            SetWhishlist({btnName: "Remove from Wishlist", onWishlist: true})
          } else {
            SetWhishlist({btnName: "Add to Wishlist", onWishlist: false})
          }
          if (response.data.cart) {
            SetCart({btnName: "Remove from Cart", onCart: true})
          } else {
            SetCart({btnName: "Add to Cart", onCart: false})
          }
        }
      } else {
        window.location.href = "/404"
      }
    });
  }, [id])
  
  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            {load}
            <img src={image} className="card-img-top productImg" alt='ProductImage'/><br/>
            <Link to={"/merchant/" + seller._id}><h5>Seller: {seller.name}</h5></Link>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: {category}</li>
            <li className="list-group-item">Price: ${price}</li>
          </ul>
          <div className="card-body">
            <pre className="card-text">{description}</pre>
          </div>
          <div className="card-body">
            {message}
            <button onClick={updateCart} className="btn btn-primary">{cart.btnName}</button><br/><br/>
            <button onClick={updateWishlist} className="btn btn-primary" value={wishlist.onWishlist}>{wishlist.btnName}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;