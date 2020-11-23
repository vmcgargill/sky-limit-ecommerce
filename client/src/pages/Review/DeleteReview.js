import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../utils/API";
import Rating from '@material-ui/lab/Rating';

const DeleteReview = () => {
  const { id } = useParams();

  return(
    <div><h2>Delete your review here #{id}</h2></div>
  )

}

export default DeleteReview;