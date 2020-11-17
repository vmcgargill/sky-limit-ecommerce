import React, { useState, useEffect } from "react";
import PostReview from "../../components/Review/PostReview"
import { useParams } from "react-router";
import API from "../../utils/API"


function PostNewReview() {
  const { id } = useParams();
  const [name, setName] = useState("")

  useEffect(() => {
    API.getProduct(id).then(res => {
      setName(res.data.product.name)
    })
  })

  return (
    <div>
      <h5>View review details {name}</h5>
      <PostReview new={true}/>
    </div>
  );
}

export default PostNewReview;