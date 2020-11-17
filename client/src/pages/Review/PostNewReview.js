import React from "react";
import PostReview from "../../components/Review/PostReview"
import { useParams } from "react-router";
import API from "../../utils/API"


function PostNewReview() {
  const { id } = useParams();

  return (
    <div>
      <h5>Post new review for product #{id}</h5>
      <PostReview new={true}/>
    </div>
  );
}

export default PostNewReview;