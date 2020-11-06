import React from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import ProductList from "../Product/ProductList";
import './User.css';

const User = (props) => {
  const user = props.user;
  // console.log(user)
  // // let { id } = useParams();
  // const [name] = useState(user.name);
  // const [email] = useState(user.email);
  // const [productList] = useState(user.productList);

  // useEffect(() => {
  //   if (user === "params") {
  //     axios({
  //       method: "get",
  //       url: "/api/merchant/" + id
  //     }).then(function(response) {
  //       setName(response.data.merchant.name);
  //       setEmail(response.data.merchant.email);
  //       setProductList(response.data.products)
  //     });
  //   } else {

  //   }
  // }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title"><a>{user.name}</a></h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Constact Email: <a>{user.email}</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default User;