import axios from "axios";
import { server } from "../../server";
import { getAdminLocalStorage, getLocalStorage } from "../helper";

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

export const axiosWithAdminToken = axios.create({
  baseURL: server + "/admin",
});

axiosWithAdminToken.interceptors.request.use(
  (config) => {
    const data = getAdminLocalStorage();
    config.headers["authorization"] = data.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
