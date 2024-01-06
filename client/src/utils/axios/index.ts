import axios from "axios";
import { server } from "../../server";

export const authApi = axios.create({
  baseURL: server + "/auth",
});

export const axiosWithToken = axios.create({
  baseURL: server + "/user",
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("userCredentials");
    if (!userData) throw new Error("UserData not found");
    const data = JSON.parse(userData);
    config.headers["authorization"] = data.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
