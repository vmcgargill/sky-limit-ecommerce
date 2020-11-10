import React, { useState, useEffect } from "react";
import ProductList from "../../components/Product/ProductList"
import API from "../../utils/API";

function Home() {
  const [products, setProducts] = useState ([]);

  useEffect(() => {
    API.getProducts("/api/products").then(res => {
      console.log(res.data[0].image.data.data)
      setProducts(res.data);
    });
  }, [])

  return (
    <div className="row">
      <h1>Home</h1>
      <ProductList products={products}/>
    </div>
  );
}

export default Home;