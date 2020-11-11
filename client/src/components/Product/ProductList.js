import React from "react";
import ConvertImage from '../../ConvertImage'
import {Link} from "react-router-dom"
import './Product.css';

function ProductList(props) {
  const products = props.products;

  const productListItems = products.map((product) => {
    let productImg = "";

    if (product.image === undefined) {
      productImg = "/Default.jpg";
    } else {
      productImg = "data:image/jpeg;base64," + ConvertImage(product.image.data.data);
    }

    return (
      <div className="card mb-3" key={product._id}>
        <Link to={"/product/" + product._id}>
        <div className="row no-gutters">
          <div className="col-md-4">
          <div className="imageDiv"><img src={productImg} className="card-img" alt="..."></img></div>
          </div>
          <div className="col-md-8">
            <div className="card-body productListBody">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
              <p className="card-text productDescription">{product.description}</p>
              <p className="card-text productDescription">Overall rating: 5/5 Stars</p>
              <p className="card-text"><small className="text-muted">Posted 2 days ago</small></p>
            </div>
          </div>
        </div>
        </Link>
      </div>
    )
  })

  return (
    <div className="container">
      {productListItems}
    </div>
  );
}

export default ProductList;