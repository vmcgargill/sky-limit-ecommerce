import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PostReview from "../../components/Review/PostReview"
import API from "../../utils/API";

const EditReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState({});

  useEffect(() => {
    API.getCustomerReview(id).then(res => {
      if (res.data === 401) {
        window.location.href = "/login/editReview/" + id;
      } else if (res.data === 404) {
        window.location.href = "/404";
      } else {
        setReview(res.data)
      }
    })
  }, [id])

  return(
    <div>
      <h2>Edit your review here #{id}</h2>
      <PostReview new={false} review={review}/>
    </div>
  )

}

export default EditReview;

