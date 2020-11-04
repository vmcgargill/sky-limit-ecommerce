import React from "react";

function ProductList(props) {
  const products = props.products;
  console.log(props)
  const listItems = products.map((products) =>
    <li>Name: {products.name} Category: {products.category} price: {products.price} Desctiption: {products.description}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default ProductList;