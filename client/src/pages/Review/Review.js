import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Rating from '@material-ui/lab/Rating';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import LoadingIcon from "../../components/SmallLoadingIcon/SmallLoadingIcon";
import ConvertImage from '../../ConvertImage'
import "./Review.css"

function Review() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(null);
  const [image, setImage] = useState(LoadingIcon);
  const [seller, setSeller] = useState({});
  const [reviewer, setReviewer] = useState({});
  const [product, setProduct] = useState({});

  useEffect(() => {
    API.getReview(id).then(res => {
      if (res.data === 404) {
        return window.location.href = "/404";
      } else if (res.data._id) {
        const review = res.data;
        setTitle(review.title);
        setDescription(review.description);
        setRating(review.rating);
        if (res.data.product) {
          const product = res.data.product;
          setProduct(res.data.product)
          if (product.image) {
            setImage(<img src={"data:image/jpeg;base64," + ConvertImage(product.image.data.data)} className="card-img-top productImg" alt='ProductImage'/>)
          } else {
            setImage(<img src={"/Default.jpg"} className="card-img-top productImg" alt='ProductImage'/>)
          }
        } else if (res.data.product === null) {
          setImage("This product is no longer avilable.")
        }
        if (res.data.reviewer) {
          setReviewer(res.data.reviewer)
        } else if (res.data.reviewer === null) {
          setReviewer({name: "This reviewer is no longer avilable."})
        }
        if (res.data.seller) {
          setSeller(res.data.seller)
        } else if (res.data.seller === null) {
          setSeller({name: "This seller is no longer avilable.", _id: "404"})
        }
      }
    })
  }, [id])

  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body reviewCard">
            <h3>"{title}"</h3><br/>
            <div className="reviewImg">{image}</div>
            <h5>Overal rating:</h5>
            <Rating name="rating" precision={0.1} value={rating} readOnly />
          </div>
          <div className="card-body reviewCard">
            <h6>Reviewed By: {reviewer.name}</h6>
            <pre className="card-text">{description}</pre>
          </div>
          <div className="card-body">
            <h6>Review for: <Link to={"/product/" + product._id}>{product.name}</Link></h6>
            Seller: <Link to={"/merchant/" + seller._id}>{seller.name}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;