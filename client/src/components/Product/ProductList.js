import React from "react";
import ConvertImage from '../../ConvertImage'
import {Link} from "react-router-dom"
import Rating from '@material-ui/lab/Rating';
import USDformatter from "../../USDformatter"
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

    let productRating = <p className="card-text productDescription">Product has not yet been reviewed.</p>
    if (product.reviews.length > 0) {
      const averageRating = product.reviews.map(review => review.rating).reduce((x, y) => x + y, 0) / product.reviews.length;
      productRating = (<p className="card-text productDescription">Overall Rating: <br/><Rating name="rating" precision={0.1} value={averageRating} readOnly /></p>);
    }

    return (
      <div className="card mb-3" key={product._id}>
        <Link to={"/product/" + product._id}>
        <div className="row no-gutters">
          <div className="col-sm-4 col-md-4 col-lg-4">
          <div className="imageDiv"><img src={productImg} className="card-img" alt="..."></img></div>
          </div>
          <div className="col-sm-8 col-md-8 col-lg-8">
            <div className="card-body productListBody">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{USDformatter.format(product.price / 100)}</p>
              <p className="card-text productDescription">{product.description}</p>
              {productRating}
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