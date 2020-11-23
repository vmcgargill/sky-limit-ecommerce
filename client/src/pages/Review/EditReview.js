import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../utils/API";
import Rating from '@material-ui/lab/Rating';

const EditReview = () => {
  const { id } = useParams();

  return(
    <div><h2>Edit your review here #{id}</h2></div>
  )

}

export default EditReview;

