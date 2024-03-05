// ContactUsApi.ts
import { REACT_APP_URL, getRefreshToken, getToken } from "../constant";
import axiosInstance from "./axiosConfig";
import { fetchCart } from "../../../server/src/controllers/CartController";

// Define a function to handle HTTP requests with authorization headers
export const axiosWithAuthorization = async (
  method: string,
  url: string,
  data?: any
): Promise<any> => {
  try {
    const token = getToken();
    const response = await axiosInstance({
      method,
      url,
      data,
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error: any) {
    const refreshToken = getRefreshToken();
    if (error.response.status === 403) {
      const response = await axiosWithAuthorization("post", `/refresh`, {
        refreshToken,
      });
      console.log({ response });
      if (response.success) {
        localStorage.setItem("accessToken", response.accessToken); // Save access token in local storage
        //reload the page
        window.location.reload();
      } else {
        window.location.href = REACT_APP_URL || "";
      }
    } else {
      window.location.href = REACT_APP_URL || "";
    }

    throw error;
  }
};

export const signIn = async (signInData: any): Promise<any> => {
  return axiosWithAuthorization("post", "/signin", signInData);
};

export const signup = async (SignupData: any): Promise<any> => {
  return axiosWithAuthorization("post", "/signup", SignupData);
};

export const dishes = async (): Promise<any> => {
  return axiosWithAuthorization("get", "/dishes");
};

export const addDishCart = async (cartData: any) => {
  return axiosWithAuthorization("post", `/cart`, cartData);
};

export const fetchCartData = async (userId: any) => {
  return axiosWithAuthorization("get", `/cart/${userId}`);
};

export const getUserData = async (): Promise<any> => {
  return axiosWithAuthorization("get", "/get_user_data");
};

export const addToOrders = async (ordersData: any) => {
  return axiosWithAuthorization("post", "/orders", ordersData);
};

export const fetchOrders = async (userId: any) => {
  return axiosWithAuthorization("get", `/orders/${userId}`);
};
