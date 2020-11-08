import axios from "axios";

export default {
  Signup: (name, email, password) => {
    return axios.post("/api/signup", {
      name: name,
      email: email,
      password: password
    });
  },
  Login: (email, password) => {
    return axios.post("/api/login", {
      email: email,
      password: password
    });
  },
  Logout: () => {
    return axios.get("/api/logout");
  },
  getUserLoginStatus: () => {
    return axios.get("/api/user_data");
  },
  getMerchant: (id) => {
    return axios.get("/api/merchant/" + id);
  },
  getMerchantProducts: () => {
    return axios.get("/api/merchantProducts");
  },
  getUserProfile: () => {
    console.log("Made api call")
    return axios.get("/api/userProfile");
  },
  searchProducts: (search) => {
    return axios.get("/api/searcProducts/" + search)
  },
  getProducts: (query) => {
    return axios.get(query);
  },
  getProduct: (id) => {
    return axios.get("/api/product/" + id);
  },
  postProduct: (query) => {
    query.method = "post"
    query.url = "/api/postProduct"
    return axios(query);
  },
  updateProduct: (id, query) => {
    query.method = "put"
    query.url = "/api/editProduct/" + id;
    return axios(query);
  },
  loadCart: () => {
    return axios.get("/api/userCart");
  },
  addCart: (id) => {
    return axios.post("/api/addCart/" + id);
  },
  removeCart: (id) => {
    return axios.put("/api/removeCart/" + id);
  },
  loadWishlist: () => {
    return axios.get("/api/userWishlist");
  },
  addWishlist: (id) => {
    return axios.post("/api/wishList/" + id);
  },
  removeWishlist: (id) => {
    return axios.put("/api/removeWishList/" + id);
  },
  deleteProduct: (id) => {
    return axios.delete("/api/deleteProduct/" + id);
  }
};