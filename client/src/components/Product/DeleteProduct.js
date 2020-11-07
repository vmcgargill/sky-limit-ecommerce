import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function DeleteProduct() {
  let { id } = useParams();
  const [name, setName] = useState ("");
  const [confirmName, setNameConfirmation] = useState ("");

  const handleChange = (event) => {
    setNameConfirmation(event.target.value)
  }

  const deleteProduct = () => {
    if (name === confirmName) {
      axios({
        method: "delete",
        url: "/api/deleteProduct/" + id
      }).then(function(response) {
        window.location.href = "/sellingAccount";
      })
    }
  }
  
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/productDetails/" + id
    }).then(function(response) {
      setName(response.data.name);
    })
  }, [])

  return (
    <div>
      <h2>Are you sure you want to delete this product?</h2>
      <h5>Please type the name of the product '{name}' to confirm.</h5>
      <input class="form-control" placeholder="Product Name" value={confirmName} onChange={handleChange}></input>
      <button class="btn btn-danger" onClick={deleteProduct}>I understand that deleting a product is permenant and confirm deleting this product.</button>
    </div>
  );
}

export default DeleteProduct;