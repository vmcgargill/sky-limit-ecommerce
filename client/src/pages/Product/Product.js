import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom"
import ConvertImage from '../../ConvertImage'
import API from "../../utils/API";
import Success from "../../components/Success/Success"
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import Rating from '@material-ui/lab/Rating';
import Select from 'react-select';
import USDformatter from "../../USDformatter"
import './Product.css';

function Product() {
  let { id } = useParams();
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("")
  const [name, seName] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ratingMsg, setRatingMsg] = useState("");
  const [image, setImage] = useState(LoadingIcon);
  const [seller, setSeller] = useState({});
  const [wishlist, SetWhishlist] = useState({
    btnName: "Wishlist", 
    onWishlist: false
  });
  const [cart, SetCart] = useState({
    btnName: "Cart", 
    onCart: false
  });
  const [reviewBtn, setReviewBtn] = useState("")
  
  const updateCart = () => { 
    if (cart.onCart === undefined) {
      window.location.href = "/editProduct/" + id
    } else if (cart.onCart) {
      API.removeCart(id).then(res => {
        if(res.data === 401) {
          window.location.replace("/login/product/" + id);
        } else {
          setMessage(<Success message={"Removed from Cart"}/>)
          return SetCart({btnName: "Add to Cart", onCart: false})
        }
      })
    } else if (!cart.onCart) {
      API.addCart(id).then(res => {
        if (res.data === 401) {
          window.location.replace("/login/product/" + id);
        } else {
          window.location.href = "/cartAdded/" + id
        }
      });
    }
  }

  const updateWishlist = () => {
    if (wishlist.onWishlist === undefined) {
      window.location.href = "/sellingAccount"
    } else if (wishlist.onWishlist) {
      API.removeWishlist(id).then(res => {
        if (res.data === 401) {
          window.location.href = "/login/product/" + id;
        } else {
          SetWhishlist({btnName: "Add to Wishlist", onWishlist: false})
          setMessage(<Success message={"Removed from Wishlist"}/>)
        }
      });
    } else if (!wishlist.onWishlist) {
      API.addWishlist(id).then(res => {
        if (res.data === 401) {
          window.location.href = "/login/product/" + id;
        } else {
          SetWhishlist({btnName: "Remove from Wishlist", onWishlist: true})
          setMessage(<Success message={"Added to Wishlist"}/>)
        }
      });
    }
  }
  
  useEffect(() => {
    API.getProduct(id).then(response => {
      if (response.data === 404) {
        window.location.href = "/404"
      } else {
        if (!response.data.product.seller) {
          window.location.href = "/404"
        } else if (response.data.product) {
          const product = response.data.product;
          if (response.data.averageRating === null) {
            setRatingMsg(<p>Product has not yet been reviewed.</p>)
          }
          setRating(response.data.averageRating)
          seName(product.name)
          setCategory(product.category)
          setPrice(USDformatter.format(product.price))
          setDescription(product.description)
          setSeller(product.seller)
          if (product.keywords) {
            const keywordList = [];
            product.keywords.forEach(keyword => {
              keywordList.push({label: keyword.label, value: keyword.value, isFixed: true})
            })
            setKeywords(keywordList)
          }
          if (product.image) {
            setImage(<div className="productImg"><img src={"data:image/jpeg;base64," + ConvertImage(product.image.data.data)} className="card-img-top" alt='ProductImage'/></div>)
          } else {
            setImage(<div className="productImg"><img src={"/Default.jpg"} className="card-img-top productImg" alt='ProductImage'/></div>)
          }

          if (response.data.signedin) {
            // Sart
            if (response.data.isSeller) {
              SetCart({btnName: "Edit Product", onCart: undefined})
              SetWhishlist({btnName: "Go to Selling Account", onWishlist: undefined})
              setReviewBtn("")
            } else if (!response.data.isSeller) {
              // Wishlist
              if (response.data.wishlist) {
                SetWhishlist({btnName: "Remove from Wishlist", onWishlist: true})
              } else {
                SetWhishlist({btnName: "Add to Wishlist", onWishlist: false})
              }
  
              // Cart
              if (response.data.cart) {
                SetCart({btnName: "Remove from Cart", onCart: true})
              } else {
                SetCart({btnName: "Add to Cart", onCart: false})
              }
  
              // Already Ordered
              if (response.data.ordered) {
  
                // Reviewed
                if (!response.data.reviewed) {
                  setReviewBtn(<div><br/><button className="btn btn-primary" onClick={() => {
                    window.location.href = "/productReview/" + id;
                  }}>Write a Review</button></div>)
                }
  
                // Buy Again Button
                if (!response.data.cart) {
                  SetCart({btnName: "Buy Again", onCart: false})
                }
              }
            }
          } else {
            SetCart({btnName: "Add to Cart", onCart: false})
            SetWhishlist({btnName: "Add to Wishlist", onWishlist: false})
          }
        } else {
          window.location.href = "/404"
        }
      }
    });
  }, [id])

  const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: 'none' } : base;
    },

  };
  
  return (
    <div className="row">
      <div className="col">
        <div className="card mainCard">
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            {image}<br/>
            <Link className="item" to={"/merchant/" + seller._id}><h5>Seller: {seller.name}</h5></Link>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Overall Rating: <br/>
            {ratingMsg}
            <Rating name="rating" precision={0.1} value={rating} readOnly /><br/>
            <button className="btn btn-primary" onClick={() => {
              window.location.href = "/product/reviews/" + id
            }}>See All Reviews</button></li>
            <li className="list-group-item">Category: {category}</li>
            <li className="list-group-item">Price: {price}</li>
            <li className="list-group-item">Keywords: <br/><br/><Select
              value={keywords}
              isMulti
              styles={styles}
              isClearable={false}
              isDisabled={true}
              isOptionDisabled={true}
              placeholder="There are no keywords for this product."
            /><br/></li>
          </ul>
          <div className="card-body">
            <pre className="card-text">{description}</pre>
          </div>
          <div className="card-body">
            {message}
            <button onClick={updateCart} className="btn btn-success">{cart.btnName}</button><br/><br/>
            <button onClick={updateWishlist} className="btn btn-success" value={wishlist.onWishlist}>{wishlist.btnName}</button>
            {reviewBtn}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;