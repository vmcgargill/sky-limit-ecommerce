import React, { useState, useEffect } from "react";
import PostProduct from "../../components/Product/PostProduct"
import API from "../../utils/API"
import { useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    API.getSellerProduct(id).then(res => {
      console.log(res)
      if (res.data === 401) {
        window.location.href = "/login/editProduct/" + id
      } else if (res.data.product) {
        const editingProduct = res.data.product;
        setProduct(editingProduct)
      } else {
        window.location.href = "/404"
      }
    })
  }, [id])

  return (
    <PostProduct new={false} product={product}/>
  );
}

export default EditProduct;