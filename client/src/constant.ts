import Logo from "./assets/logo_long.png";
import HomeImage from "./assets/home.jpg";
const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/api`;
const REACT_APP_URL = process.env.REACT_APP_URL;
const getToken = async () => {
  return await localStorage.getItem("token");
};
const token: any = getToken();

export { token, REACT_APP_API_URL, Logo, REACT_APP_URL, HomeImage };
