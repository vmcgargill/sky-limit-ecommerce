import React, { useState, useEffect } from "react";
import PostReview from "../../components/Review/PostReview"
import { useParams } from "react-router";
import API from "../../utils/API"


function PostNewReview() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    API.getProduct(id).then(res => {
      setName(res.data.product.name)
      setProduct(res.data.product)
    })
  }, [id])

  return (
    <div>
      <h5>Write a review for {name}</h5>
      <PostReview new={true} product={product}/>
    </div>
  );
}

export default PostNewReview;