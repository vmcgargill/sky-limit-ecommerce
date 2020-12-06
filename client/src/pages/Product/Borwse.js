import React, {useState, useEffect} from "react";
import ProductList from "../../components/Product/ProductList"
import API from "../../utils/API"
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"

const HolidayGifts = ({mainHeader, subHeader, keyword}) => {
  const [products, setProducts] = useState([])
  const [load, setLoad] = useState(LoadingIcon);

  useEffect(() => {
    API.searchProducts(keyword).then(res => {
      setLoad("")
      setProducts(res.data)
      if (res.data.length > 0) {
      }
    })
  }, [keyword])

  return (
    <div className="card mainCard">
      <div className="card-body">
        <h2>{mainHeader}</h2>
        <h5>{subHeader}</h5>
        {load}
        <ProductList products={products}/>
      </div>
    </div>
  )

}

export default HolidayGifts;