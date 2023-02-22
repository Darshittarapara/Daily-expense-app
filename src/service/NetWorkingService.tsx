import axios from "axios";
import { config } from "config/config";
import { timeout } from "q";

export const apiConfig = axios.create({
    baseURL:config.baseURL,
    timeout:40000
})

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });