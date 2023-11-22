import axios from "axios";

const BASE_URL = "https://ecom-backend-k3xo.onrender.com";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const userRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { token: `Bearer ${TOKEN}` },
});
