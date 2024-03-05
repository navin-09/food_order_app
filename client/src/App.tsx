import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { NavBar } from "./components/NavBar/NavBarMantine/NavBarMantine";
import { useState, useEffect } from "react";

import SuccessPage from "./pages/SuccessPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CustomLoader from "./components/BaseComponents/Loader/CustomLoader";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import { getToken } from "./constant";
import OrdersDetailsPage from "./pages/Order";

function App() {
  const [loading, setLoading] = useState(true);
  const [token, settoken]: any = useState("");
  useEffect(() => {
    const checkAuthStatus = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = getToken();
      settoken(token);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);
  console.log({ token });
  const routes = [
    { path: "/", element: token ? <CatalogPage /> : <Home /> },
    { path: "/home", element: token ? <CatalogPage /> : <Home /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/signin", element: <SignInPage /> },
    { path: "/catalog", element: <CatalogPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/success", element: <SuccessPage /> },
    { path: "/orders", element: <OrdersDetailsPage /> },
    { path: "/registrationSuccess", element: <RegistrationSuccessPage /> },
    { path: "/404", element: <NotFoundPage /> },
    { path: "*", element: <NotFoundPage /> },
  ];
  if (loading) {
    return <CustomLoader message="Loading..." />;
  }
  return (
    <Router>
      <NavBar>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </NavBar>
    </Router>
  );
}

export default App;
