import React, { useState, useEffect } from "react";
import ProductList from "../../components/Product/ProductList"
import API from "../../utils/API";
import "./Home.css"

function Home() {
  const [products, setProducts] = useState ([]);

  useEffect(() => {
    API.getProducts("/api/products").then(res => {
      if (res.data) {
        setProducts(res.data);
      }
    });
  }, [])

  return (
    <div class="home">
      <h2>Shop for the Holidays</h2>
      <div className="row">
        <ProductList products={products}/>
      </div>
    </div>
  );
}

export default Home;