import React, { useState, useEffect } from "react";
import ProductList from "../../components/Product/ProductList"
import API from "../../utils/API";

function Home() {
  const [products, setProducts] = useState ([]);

  useEffect(() => {
    API.getProducts("/api/products").then(res => {
      console.log(res.data)
      // setProducts(res.data);
    });
  }, [])

  return (
    <div className="row">
      {/* <ProductList products={products}/> */}
    </div>
  );
}

export default Home;