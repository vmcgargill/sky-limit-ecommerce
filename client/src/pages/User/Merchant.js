import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProductList from "../../components/Product/ProductList";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import API from "../../utils/API";
import Rating from '@material-ui/lab/Rating';
import "./User.css";

const Merchant = () => {
  let { id } = useParams();
  const [merchant, setMerchant] = useState({});
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(LoadingIcon);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    API.getMerchant(id).then(res => {
      if (res.data === 404) {
        window.location.href = "/404"
      }
      if (res.data.merchant) {
        setLoad("")
        setMerchant(res.data.merchant);
        if (res.data.rating === null) {
          setRating("Seller has not yet been rated!")
        } else {
          setRating(<Rating name="rating" precision={0.1} value={res.data.rating} readOnly />);
        }
        if (res.data.products) {
          setProducts(res.data.products);
        } else {
          setProducts(<p className="card-text">User does no currently have any products.</p>);
        }
      } else {
        window.location.href = "/404"
      }
    });
  }, [id]); 
  
  return(
      <div className="card mainCard">
        <h5 className="card-header">Merchant</h5>
        <div className="card-body merchantCard">
          <h5 className="card-title">Contact Information</h5>
          <p className="card-text">Name: {merchant.name}</p>
          <p className="card-text">Email: {merchant.email}</p>
          <a href={"mailto:" + merchant.email} className="btn btn-primary">Contact</a>
        </div>
        <div className="card-body merchantCard">
          <h5 className="card-title">Overall Seller Rating:</h5>
          <p className="card-text">{rating}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Current Products:</h5>
          {load}
          <ProductList products={products}/>
        </div>
      </div>
  )
}

export default Merchant;