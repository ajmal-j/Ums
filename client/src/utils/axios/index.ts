import axios from "axios";
import { server } from "../../server";
import { getLocalStorage } from "../helper";

export const authApi = axios.create({
  baseURL: server + "/auth",
});

export const adminAuthApi = axios.create({
  baseURL: server + "/adminAuth",
});

export const axiosWithToken = axios.create({
  baseURL: server + "/user",
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const data = getLocalStorage();
    config.headers["authorization"] = data.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
