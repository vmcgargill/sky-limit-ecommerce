import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import Rating from '@material-ui/lab/Rating';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.getCustomerReviews().then(res => {
      if (res.data === 401) {
        window.location.href = "/login/customerReviews"
      } else {
        if (res.data.length === 0) {
          setReviews(<h5>You have no posted any reviews yet!</h5>)
        } else {
          const customerReviews = res.data.map(review => {
            return (
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 class="card-title">Review for: {review.product.name}</h5><br/>
                      <h6 class="card-subtitle"><Rating name="rating" precision={0.1} value={review.rating} readOnly/></h6><br/>
                      <button className="btn btn-primary" onClick={() => {
                        window.location.href = "/editReview/" + review._id
                      }}>Edit Review</button><br/><br/>
                      <button className="btn btn-danger" onClick={() => {
                        window.location.href = "/deleteReview/" + review._id
                      }}>Delete Review Review</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })

          setReviews(customerReviews);
  
        }
      }

    })

  }, [])


  return (
    <div className="container">
      <h1>See customer reviews here</h1>
      {reviews}
    </div>
  )

}

export default CustomerReviews;