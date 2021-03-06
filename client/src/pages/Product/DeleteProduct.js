import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../utils/API";

function DeleteProduct() {
  let { id } = useParams();
  const [name, setName] = useState ("");
  const [confirmName, setNameConfirmation] = useState ("");

  const handleChange = (event) => {
    setNameConfirmation(event.target.value)
  }

  const deleteProduct = () => {
    if (name === confirmName) {
      API.deleteProduct(id).then(() => {
        window.location.href = "/sellingAccount";
      });
    }
  }
  
  useEffect(() => {
    API.getSellerProduct(id).then((res) => {
      if (res.data === 401) {
        window.location.href = "/login/deleteProduct/" + id;
      } else if (res.data.product) {
        setName(res.data.product.name);
      } else {
        window.location.href = "/404"
      }
    })
  }, [id])

  return (
    <div>
      <h2>Are you sure you want to delete this product?</h2>
      <h5>Please type the name of the product '{name}' to confirm.</h5>
      <input className="form-control" placeholder="Product Name" value={confirmName} onChange={handleChange}></input><br/>
      <button className="btn btn-danger" onClick={deleteProduct}>I understand that deleting a product is permenant and confirm deleting this product.</button>
    </div>
  );
}

export default DeleteProduct;