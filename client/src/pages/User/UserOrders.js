import React, { useEffect, useState } from "react";

const UserOrder = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Add something here
    setProducts([])
  }, [setProducts])


  return (
    <div className="container">
      <h2>View User Orders Here</h2>
      {products}
      <h5>Payment Method: Card ending in xxxx</h5>
    </div>
  )

}

export default UserOrder;