import React from "react";
import ConvertImage from '../../ConvertImage'
import './Product.css';

function ProductList(props) {
  const products = props.products;

  console.log(products)
  const listItems = products.map((product) => 
    <div class="card mb-3">
      <a href={"/product/" + product._id}>
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src={"data:image/jpeg;base64," + ConvertImage(product.image.data.data)} class="card-img productListImg" alt="..."></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">${product.price}</p>
            <p class="card-text"><a class="productDescription">{product.description}</a></p>
            <p class="card-text"><small class="text-muted">Posted 2 days ago</small></p>
          </div>
        </div>
      </div>
      </a>
    </div>
  );

  return (
    <div className="container">
      <h1>Home</h1>
      {listItems}
    </div>
  );
}

export default ProductList;