import React, { useState, useEffect } from "react";
import Rating from '@material-ui/lab/Rating';
import SmallLoadingIcon from "../SmallLoadingIcon/SmallLoadingIcon"

const PostReview = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = React.useState(null);
  const [load, setLoad] = useState("");

  const PostReview = (event) => {
    event.preventDefault()
    console.log("Review has been posted.")
    console.log(rating, title, description)
    setLoad(SmallLoadingIcon)
  }

  useEffect(() => {
    if (!props.new) {
      console.log("We are editing an existing review.")
    } else {
      console.log("We are creating a new review.")
    }
  })

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