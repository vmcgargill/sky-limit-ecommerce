import axios from "axios";

const API = {
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
  getUserData: () => {
    return axios.get("/api/user_data");
  },
  getUserAddresses: () => {
    return axios.get("/api/userAddresses")
  },
  getMerchant: (id) => {
    return axios.get("/api/merchant/" + id);
  },
  getMerchantProducts: () => {
    return axios.get("/api/merchantProducts");
  },
  getUserProfile: () => {
    return axios.get("/api/userProfile");
  },
  updateUserProfile: (data) => {
    return axios.put("/api/updateUser", data);
  },
  updatePassword: (data) => {
    return axios.put("/api/updatePassword", data);
  },
  createAddress: (data) => {
    return axios.post("/api/creatAddress", data);
  },
  updateAddress: (id, data) => {
    return axios.put("/api/updateAddress/" + id, data);
  },
  removeAddress: (id) => {
    return axios.put("/api/removeAddress/" + id);
  },
  setDefaultAddress: (id) => {
    return axios.put("/api/setDefaultAddress/" + id);
  },
  searchProducts: (search) => {
    return axios.get("/api/searchProducts/" + search);
  },
  getProducts: (query) => {
    return axios.get(query);
  },
  getProduct: (id) => {
    return axios.get("/api/product/" + id);
  },
  getSellerProduct: (id) => {
    return axios.get("/api/sellerProduct/" + id);
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
  getOrder: (id) => {
    return axios.get("/api/order/" + id);
  },
  getOrderHistory: () => {
    return axios.get("/api/userOrders")
  }, 
  placeOrder: (id) => {
    return axios.post("/api/placeOrder", {id: id})
  },
  deleteProduct: (id) => {
    return axios.delete("/api/deleteProduct/" + id);
  },
  getReview: (id) => {
    return axios.get("/api/review/" + id);
  },
  getProductReviews: (id) => {
    return axios.get("/api/product/reviews/" + id)
  },
  getCustomerReviews: () => {
    return axios.get("/api/customerReviews");
  },
  getCustomerReview: (id) => {
    return axios.get("/api/customerReview/" + id);
  },
  postReview: (id, data) => {
    return axios.post("/api/postReview/" + id, data);
  },
  editReview: (id, data) => {
    return axios.put("/api/editReview/" + id, data);
  },
  deleteReview: (id) => {
    return axios.delete("/api/deleteReview/" + id);
  }
};

export default API;