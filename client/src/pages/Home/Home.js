import React, { useState, useEffect } from "react";
import ProductList from "../../components/Product/ProductList"

function Home() {
  const [state, setState] = useState ([]);

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then((response) => {
      console.log(response)
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