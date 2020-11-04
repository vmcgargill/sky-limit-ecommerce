import React from "react";

function ProductList(props) {
  const products = props.products;
  const listItems = products.map((product) => 
    <li>{product.name}, {product.category}, ${product.price}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default ProductList;