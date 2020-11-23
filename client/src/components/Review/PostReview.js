import React, { useState, useEffect } from "react";
import Rating from '@material-ui/lab/Rating';
import SmallLoadingIcon from "../SmallLoadingIcon/SmallLoadingIcon"
import API from "../../utils/API";

const PostReview = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = React.useState(null);
  const [load, setLoad] = useState("");

  const PostReview = (event) => {
    event.preventDefault()
    setLoad(SmallLoadingIcon)
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
      })
    }
  }

  useEffect(() => {
    if (!props.new) {
      const review = props.review;
      setTitle(review.title);
      setDescription(review.description);
      setRating(review.rating);
    }
  }, [props])

  return (
    <div clasName="row">
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
        {load}
      </form>
      </div>
    </div>
  )
}

export default PostReview