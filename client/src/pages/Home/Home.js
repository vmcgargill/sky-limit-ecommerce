import React, { useState, useEffect } from "react";
import ProductList from "../../components/Product/ProductList"
import API from "../../utils/API";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import "./Home.css"

function Home() {
  const [products, setProducts] = useState ([]);
  const [load, setLoad] = useState(LoadingIcon);

  useEffect(() => {
    API.getProducts("/api/products").then(res => {
      if (res.data) {
        setLoad("")
        setProducts(res.data);
      }
    });
  }, [])

  return (
    <div className="home">
      <h2>Shop for the Holidays</h2>
      {load}
      <div className="row">
        <ProductList products={products}/>
      </div>
    </div>
  );
}

export default Home;