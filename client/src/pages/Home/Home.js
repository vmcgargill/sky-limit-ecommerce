import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import ProductList from "../../components/Product/ProductList"
import API from "../../utils/API";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import "./Home.css"

function Home() {
  const [products, setProducts] = useState ([]);
  const [home, setHome] = useState(LoadingIcon);

  useEffect(() => {
    API.getProducts("/api/products").then(res => {
      if (res.data) {
        setHome(
          <div className="card mainCard seasonCard">
            <div className="card=body">
              <h2>Shop Electronics</h2>
              <Link to={"/electronics"} className="btn btn-primary">Shop for Electroncis</Link><br/>
            </div>
          </div>
        )
        setProducts(res.data);
      }
    });
  }, [])

  return (
    <div className="home">
      {home}<br/>
      <div className="card mainCard">
        <div className="card-body">
          <h2>Featured Items:</h2>
          <ProductList products={products}/>
        </div>
      </div>
    </div>
  );
}

export default Home;