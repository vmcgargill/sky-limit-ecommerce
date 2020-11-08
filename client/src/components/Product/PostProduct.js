import React, { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
import { useParams } from "react-router";
import API from "../../utils/API"

function PostProduct(props) {
  const { id } = useParams();
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
    if (!props.new) {
      API.getProduct(id).then(response => {
        const editingProduct = response.data.product;
        setName(editingProduct.name);
        setDescription(editingProduct.description);
        setPrice(editingProduct.price);
        const currentCategory = {value: editingProduct.category, label: editingProduct.category}
        options.push(currentCategory);
        setCategory(currentCategory)
      })
    }
  }, [])

  const enterName = (event) => {
    setName(event.target.value)
  }

  const enterDescription = (event) => {
    setDescription(event.target.value)
  }

  const selectCategory = (event) => {
    setCategory(event)
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
      API.updateProduct(id, query).then(res => {
        window.location.href = "/product/" + res.data._id;
      })
    }
  }

  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-12">
      <form onSubmit={PostProduct}>
        <label for="name">Name:</label>
				<input placeholder="Name of Product" type="text" className="form-control" maxlength="50" value={name} onChange={enterName}></input>
        <label for="description">Description:</label>
				<textarea placeholder="Description of Product" className="form-control" rows="10" maxlength="100000" value={description} onChange={enterDescription}></textarea>
        <label for="category">Select Product Category</label>
        <CreatableSelect isClearable onChange={selectCategory} options={options} placeholder="Select or Enter Category" value={category}/><br/>
        $ <input type="number" min="0.01" step="0.01" value={price} onChange={enterPrice}></input><br/><br/>
        <input type="file" id="image" name="image" value={image} onChange={uploadImage}></input> <br/><br/>
        <button type="submit" className="btn btn-success submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default PostProduct;