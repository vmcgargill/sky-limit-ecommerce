import React, { useState, useEffect } from "react";
import ProductList from "../../components/Product/ProductList";
import { useParams } from "react-router";
import API from "../../utils/API";

const SearchResults = () => {
  let { search } = useParams();
  const [products, setProducts] = useState ([]);

  useEffect(() => {
    API.searchProducts(search).then(res => {
      setProducts(res.data);
    });
  }, [search])

  return (
    <div>
      <h2>Search Results for '{search}'</h2>
      <ProductList products={products}/>
    </div>
  )
}

export default SearchResults;