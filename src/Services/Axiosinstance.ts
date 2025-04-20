import axios from "axios";
export const baseURL='https://upskilling-egypt.com:3000'
export const userURL = '/api/v0/admin'

//public    Dont need Token
export const publicUserAxiosInstance=axios.create({
    baseURL:`${baseURL}${userURL}`,
})
//private   need Token after login
export const privateUserAxiosInstance=axios.create({
    baseURL:`${baseURL}${userURL}`,
})


privateUserAxiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] =token
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );