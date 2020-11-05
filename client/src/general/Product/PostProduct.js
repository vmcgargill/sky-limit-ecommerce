import axios from "axios";
import React, { useState } from "react";
import Select from "react-dropdown-select";

function PostProduct() {
  const [name, setName] = useState ("");
  const [description, setDescription] = useState ("");
  const [category, setCategory] = useState ("");
  const [price, setPrice] = useState ("");
  const [image, setImage] = useState ("");

  const enterName = (event) => {
    setName(event.target.value)
  }

  const enterDescription = (event) => {
    setDescription(event.target.value)
  }

  const selectCategory = (values) => {
    const selectedCategory = values[0].value;
    setCategory(selectedCategory);
  }

  const enterPrice = (event) => {
    setPrice(event.target.value)
  }

  const uploadImage = (event) => {
    setImage(event.target.value)
  }

  const PostProduct = (event) => {
    event.preventDefault()
    let product = new FormData();
    product.append("name", name);
    product.append("description", description);
    product.append("category", category);
    product.append("price", price);

    if (image !== "") {
      const pic = document.getElementById("image");
      product.append("image", pic.files[0]);
    }

    axios({
      method: "post",
      url: "/api/postProduct",
      data: product,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000
    }).then(function(response) {
      window.location.href = "/product/" + response.data._id;
    });
  }

  const options = [
    {value: "Entertainment", label: "Entertainment"},
    {value: "Electronics", label: "Electronics"},
    {value: "TVs", label: "TVs"},
    {value: "Computers", label: "Computers"},
    {value: "Cellphones", label: "Electronics"},
    {value: "Video Games", label: "Video Games"},
    {value: "Movies & TV", label: "Movies & TV"},
    {value: "Books", label: "Books"},
    {value: "Home", label: "Home"},
    {value: "Personal Care", label: "Personal Care"},
    {value: "Clothing & Jewelry", label: "Clothing & Jewelry"},
    {value: "Other", label: "Other"}
  ]

  return (
    <div class="row">
      <form onSubmit={PostProduct}>
        <label for="name">Name:</label>
				<input placeholder="Name of Product" type="text" class="form-control" maxlength="50" value={name} onChange={enterName}></input>
        <label for="description">Description:</label>
				<textarea placeholder="Description of Product" class="form-control" rows="10" maxlength="100000" value={description} onChange={enterDescription}></textarea>
        <label for="category">Select Product Category</label>
				<Select options={options} placeholder="Select Product Category" onChange={(value) => selectCategory(value)}/>
        <input placeholder="Customer Category" type="text" class="form-control hidden" id="categoryInput" maxlength="20"></input>
        $ <input type="number" min="0.01" step="0.01" value={price} onChange={enterPrice}></input>
        <input type="file" id="image" name="image" value={image} onChange={uploadImage}></input> 
        <button type="submit" class="btn btn-success submit">Submit</button>
      </form>
    </div>
  );
}

export default PostProduct;