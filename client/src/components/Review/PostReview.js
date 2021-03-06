import React, { useState, useEffect } from "react";
import Rating from '@material-ui/lab/Rating';
import SmallLoadingIcon from "../SmallLoadingIcon/SmallLoadingIcon"
import API from "../../utils/API";
import Error from "../Error/Error"

const PostReview = (props) => {
  let [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(null);
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");

  const PostReview = (event) => {
    event.preventDefault();
    setLoad(SmallLoadingIcon);

    if (title.trim() === "" || description.trim() === "") {
      setLoad("");
      setError(<Error message="Error: Title and description are required and cannot be left blank."/>)
    } else if (rating === null) {
      setLoad("");
      setError(<Error message="Error: Star rating is required for all reviews. Please rate the product 1-5 stars."/>)
    } else {
      if (props.new) {
        API.postReview(props.product._id, {
          title: title,
          description: description,
          rating: rating
        }).then(res => {
          if (res.data === 401) {
            window.location.href = "/login/postReview/" + props.product._id
          } else if (res.data === 404) {
            window.location.href = "/404"
          } else if (res.data.review) {
            window.location.href = "/review/" + res.data.review._id
          }
        }).catch(() => {
          setLoad("");
          setError(<Error message="Error: Something went wrong. Please check your review details and try again."/>)
        })
      } else {
        API.editReview(props.review._id, {
          title: title,
          description: description,
          rating: rating
        }).then(res => {
          if (res.data === 401) {
            window.location.href = "/login/editReview/" + props.review._id
          } else if (res.data === 404) {
            window.location.href = "/404"
          } else if (res.data._id) {
            window.location.href = "/review/" + res.data._id
          }
        }).catch(() => {
          setLoad("");
          setError(<Error message="Error: Something went wrong. Please check your review details and try again."/>)
        })
      }
    }
  }

  useEffect(() => {
    if (!props.new) {
      const review = props.review;
      if (props.review._id) {
        setTitle(review.title);
        setDescription(review.description);
        setRating(review.rating);
      }
    }
  }, [props, setTitle, setDescription, setRating])

  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-12">
      <form onSubmit={PostReview}>
        <label htmlFor="title">Title of Review:</label>
        <input id="title" placeholder="Title of Review" type="text" className="form-control" 
        maxLength="50" value={title} onChange={(ev) => {setTitle(ev.target.value)}}></input>
        <label htmlFor="body">Add a Description:</label>
        <textarea placeholder="What did you like or dislike about the product?" className="form-control" rows="10" maxLength="100000" 
        value={description} onChange={(ev) => {setDescription(ev.target.value)}}></textarea>
        <label htmlFor="category">Overall Rating</label><br/>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newRating) => {
            event.preventDefault()
            setRating(newRating);
          }}
        /><br/>
        <button type="submit" className="btn btn-primary submit">Submit</button>
      </form><br/>
      {load}
      {error}
      </div>
    </div>
  )
}

export default PostReview