import Logo from "./assets/logo_long.png";
import HomeImage from "./assets/home.jpg";
const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/api`;
const REACT_APP_URL = process.env.REACT_APP_URL;

const getToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

export {
  getToken,
  getRefreshToken,
  REACT_APP_API_URL,
  Logo,
  REACT_APP_URL,
  HomeImage,
};
