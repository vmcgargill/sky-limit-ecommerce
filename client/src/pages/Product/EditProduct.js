import React, { useState, useEffect } from "react";
import PostProduct from "../../components/Product/PostProduct"
import API from "../../utils/API"
import { useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    API.getProduct(id).then(response => {
      const editingProduct = response.data.product;
      setProduct(editingProduct)
    })
  }, [id])

  return (
    <PostProduct new={false} product={product}/>
  );
}

export default EditProduct;