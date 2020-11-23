import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../utils/API";

const DeleteReview = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  const deleteReview = () => {
    API.deleteReview(id).then(res => {
      if (res.data === 404) {
        window.location.href = "/404"
      } else if (res.data === 401) {
        window.location.href = "/login/deleteReview/" + id
      } else if (res.data === 200) {
        window.location.href = "/customerReviews"
      }
    })
  }

  useEffect(() => {
    API.getCustomerReview(id).then(res => {
      if (res.data === 401) {
        window.location.href = "/login/deleteReview/" + id;
      } else if (res.data === 404) {
        window.location.href = "/404";
      } else {
        setTitle(res.data.title)
      }
    })
  }, [id])

  return(
    <div className="container">
      <h5>Are you sure you want to delete this review title "{title}"?</h5><br/><br/>
      <button className="btn btn-primary" onClick={deleteReview}>Delete Review</button>
    </div>
  )

}

export default DeleteReview;