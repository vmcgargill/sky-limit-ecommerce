import React, { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
import API from "../../utils/API"

function PostProduct(props) {
  const [name, setName] = useState ("");
  const [description, setDescription] = useState ("");
  const [category, setCategory] = useState ("");
  const [price, setPrice] = useState ("");
  const [image, setImage] = useState ("");

  const options = [
    {value: "Entertainment", label: "Entertainment"},
    {value: "Electronics", label: "Electronics"},
    {value: "TVs", label: "TVs"},
    {value: "Computers", label: "Computers"},
    {value: "Cellphones", label: "Cellphones"},
    {value: "Video Games", label: "Video Games"},
    {value: "Movies & TV", label: "Movies & TV"},
    {value: "Books", label: "Books"},
    {value: "Home", label: "Home"},
    {value: "Personal Care", label: "Personal Care"},
    {value: "Clothing & Jewelry", label: "Clothing & Jewelry"}
  ]

  useEffect(() => {
    if (!props.new && props.product._id) {
      setName(props.product.name);
      setDescription(props.product.description)
      setPrice(props.product.price);
      const currentCategory = {value: props.product.category, label: props.product.category}
      setCategory(currentCategory)
    }
  }, [props, setName, setDescription, setPrice, setCategory])

  const PostProduct = (event) => {
    event.preventDefault()

    let product = new FormData();
    product.append("name", name);
    product.append("description", description);
    product.append("category", category.value);
    product.append("price", price);

    if (image !== "") {
      const pic = document.getElementById("image");
      product.append("image", pic.files[0]);
    }

    const query =  {
      data: product,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000
    }

    if (props.new) {
      API.postProduct(query).then(res => {
        window.location.href = "/product/" + res.data._id;
      })
    } else {
      API.updateProduct(props.product._id, query).then(res => {
        window.location.href = "/product/" + res.data._id;
      })
    }
  }

  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-12">
      <form onSubmit={PostProduct}>
        <label htmlFor="name">Name:</label>
        <input placeholder="Name of Product" type="text" className="form-control" 
        maxLength="50" value={name} onChange={(ev) => {setName(ev.target.value)}}></input>
        <label htmlFor="description">Description:</label>
        <textarea placeholder="Description of Product" className="form-control" rows="10" maxLength="100000" 
        value={description} onChange={(ev) => {setDescription(ev.target.value)}}></textarea>
        <label htmlFor="category">Select Product Category</label>
        <CreatableSelect isClearable onChange={(ev) => {setCategory(ev)}}
        options={options} value={category} placeholder="Select or Enter Category"/><br/>
        $ <input type="number" min="0.01" step="0.01" value={price} onChange={(ev) => {setPrice(ev.target.value)}}></input><br/><br/>
        <input type="file" id="image" name="image" onChange={(ev) => {setImage(ev.target.value)}}></input> <br/><br/>
        <button type="submit" className="btn btn-success submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default PostProduct;