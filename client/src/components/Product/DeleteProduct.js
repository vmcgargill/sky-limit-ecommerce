import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function DeleteProduct() {
  let { id } = useParams();
  let [Product, setProduct] = useState({});
  
  useEffect(() => {
    // axios({
    //   method: "get",
    //   url: "/api/editProduct/" + id
    // }).then(function(response) {
    //   setProduct(response);
    // })
  })

  return (
    <div>
      <h2>Are you sure you want to delete this product?</h2>
    </div>
  );
}

export default DeleteProduct;