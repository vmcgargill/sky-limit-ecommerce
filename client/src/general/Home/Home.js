import React, { useState, useEffect } from "react";
import ProductList from "../Product/ProductList"

function Home() {
  const [state, setState] = useState ([]);

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then((response) => {
      setState(response)
    })
  }, [])

  return (
    <div className="row">
      <ProductList products={state}/>
    </div>
  );
}

export default Home;