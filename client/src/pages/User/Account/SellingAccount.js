import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import API from "../../../utils/API";
import ConvertImage from '../../../ConvertImage'
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon"
import USDformatter from "../../../USDformatter"
import Rating from '@material-ui/lab/Rating';

const SellingAccount = () => {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(LoadingIcon);
  const [overallRating, setOverallRating] = useState("")

  useEffect(() => {
    API.getMerchantProducts().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/sellingAccount"
      }
      if (res.data === 404) {
        window.location.href = "/404"
      }
      if (res.data.products) {
        setLoad("")
        setProducts(res.data.products)
        if (res.data.rating === null) {
          setOverallRating(
            <div className="card-body">
              <h5>None of your products have been rated yet. Improve your seller reputation by posting more products and getting positive ratings.</h5>
              <Rating name="rating" precision={0.1} value={null} readOnly/>
            </div>
            )
        } else {
          let sellerPerformance = ""
          const sellerRating = res.data.rating
          if (sellerRating >= 4.5) {
            sellerPerformance = "You have an outstanding seller rating. Keep up the good work! You are a top rated seller."
          } else if (sellerRating >= 4.0) {
            sellerPerformance = "You have a great seller rating. There is always room for improvement but keep up the good work!"
          } else if (sellerRating >= 3.0) {
            sellerPerformance = "You have an average seller rating. Try to increase your customer service to improve this rating."
          } else if (sellerRating < 3.0) {
            sellerPerformance = "Uh oh. It looks like you have a bellow average seller rating. Post some more products and try to improve your customer service to improve this rating."
          } 
          setOverallRating(
          <div className="card-body">
            <h5>Your overall seller rating is:</h5>
            <Rating name="rating" precision={0.1} value={sellerRating} readOnly/>
            <p className="card-text">{sellerPerformance}</p>
          </div>
          )
        }
      } else {
        window.location.href = "/login/sellingAccount"
      }
    })
  }, [])

  const merchantItems = products.map((product) => {
    let productImg = "";
    let productRating = "";

    if (product.image === undefined) {
      productImg = "/Default.jpg";
    } else {
      productImg = "data:image/jpeg;base64," + ConvertImage(product.image.data.data);
    }

    if (product.reviews.length > 0) {
      const averageRating = product.reviews.map(review => review.rating).reduce((x, y) => x + y, 0) / product.reviews.length;
      productRating = (<p className="card-text">Rating:<br/><Rating name="rating" precision={0.1} value={averageRating} readOnly/></p> )
    } else {
      productRating = (
        <p className="card-text">Product has not yet been rated.<br/><Rating name="rating" precision={0.1} value={null} readOnly/></p> 
      )
    }

    return (
      <div className="card mb-3" key={product._id}>
        <div className="row no-gutters">
          <div className="col-sm-12 col-md-4 col-lg-4">
          <Link to={"/product/" + product._id}><div className="imageDiv"><img src={productImg} className="card-img" alt="..."></img></div></Link>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-8">
            <div className="card-body SellingListBody">
              <h5 className="card-title">{product.name}</h5>
              {productRating}
              <p className="card-text">{USDformatter.format(product.price)}</p>
              <p className="card-text merchantDescription">{product.description}</p>
              <button className="btn btn-primary" onClick={() => {window.location.href = "/editProduct/" + product._id;}}>Edit Product</button><br/><br/>
              <button className="btn btn-primary" onClick={() => {window.location.href = "/product/" + product._id;}}>View Product</button><br/><br/>
              <button className="btn btn-danger" onClick={() => {window.location.href = "/deleteProduct/" + product._id;}}>Delete Product</button>
            </div>
          </div>
        </div>
      </div>
    )}
  );

  return (
    <div className="container">
      <div className="card mainCard">
        <div className="card-body">
          <h2>Selling Account</h2>
          {load}
          <div className="card">
            <div className="card-body">
              <button className="btn btn-success" onClick={() => {
                window.location.href = "/postProduct"
              }}>Post Product</button><br/>
              {overallRating}
            </div>
          </div><br/>
          {merchantItems}
        </div>
      </div>
    </div>
  );
}

export default SellingAccount;