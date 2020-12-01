import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../utils/API"
import Rating from '@material-ui/lab/Rating';
import { Link } from "react-router-dom"
import "./Review.css"

function PostNewReview() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");

  useEffect(() => {
    API.getProductReviews(id).then(res => {
      if (res.data === 404) {
        window.location.href = "/404"
      } else {
        setName(res.data.name);

        if (res.data.reviews.length === 0) {
          setReviewMsg(<h5>There are currently no reviews for this product.</h5>)
        }

        const reviewListItems = res.data.reviews.map(review => {
          return (
            <div className="row" key={review._id}>
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="card reviewListCard">
                  <div className="card-body">
                    <h5 className="card-title">"{review.title}"</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><Rating name="rating" precision={0.1} value={review.rating} readOnly/></li>
                    <li className="list-group-item"><p className="description">Description: {review.description}</p></li>
                  </ul>
                  <div className="card-body">
                    <Link to={"/review/" + review._id}>View Full Review</Link>
                  </div>
                </div><br/><br/>
              </div>
            </div>
          )
        });

        setReviews(reviewListItems);
      }
    })
  }, [id])

  return (
    <div className="container">
      <h2>Reviews for {name}</h2><br/>
      {reviewMsg}
      {reviews}
    </div>
  );
}

export default PostNewReview;