import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../utils/API"

function Review() {
  const { id } = useParams();
  const [title, setTitle] = useState("")

  useEffect(() => {
    API.getReview(id).then(res => {
      setTitle(res.data.title)
    })
  })

  return (
    <div>
      <h5>View review details {title}</h5>
    </div>
  );
}

export default Review;