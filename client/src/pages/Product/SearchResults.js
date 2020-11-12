import React, { useState, useEffect } from "react";
import ProductList from "../../components/Product/ProductList";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import { useParams } from "react-router";
import API from "../../utils/API";

const SearchResults = () => {
  let { search } = useParams();
  const [products, setProducts] = useState ([]);
  const [load, setLoad] = useState(LoadingIcon);

  useEffect(() => {
    API.searchProducts(search).then(res => {
      setProducts(res.data);
      if (res.data.length === 0) {
        setLoad("No search results for '" + search + "'. Please try again.")
      } else {
        setLoad("")
      }
    });
  }, [search])

  return (
    <div>
      <h2>Search Results for '{search}'</h2>
      {load}
      <ProductList products={products}/>
    </div>
  )
}

export default SearchResults;