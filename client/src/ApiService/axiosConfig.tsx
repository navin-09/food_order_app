// axiosConfig.ts
import axios, { AxiosInstance } from "axios";
import { REACT_APP_API_URL } from "../constant";

const instance: AxiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default instance;
