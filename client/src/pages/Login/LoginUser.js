import axios from "axios";

const LoginUser = (email, password) => {
  axios({
    method: "post",
    url: "/api/login", 
    data: {
    email: email,
    password: password
  }}).then(function(response) {
    if (response.status === 200) {
      window.location.replace("/");
    }
  }).catch(function(err) {
    console.log(err)
  })
}

export default LoginUser;