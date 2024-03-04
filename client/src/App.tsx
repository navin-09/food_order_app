import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { NavBarMantine } from "./components/NavBar/NavBarMantine/NavBarMantine";
import { useState, useEffect } from "react";
import CustomLoader from "./components/BaseComponents/CustomLoader/CutsomLoader";
import SuccessPage from "./pages/SuccessPage";

function App() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    console.log("checking");
    // Simulate an async operation like fetching user status
    const checkAuthStatus = async () => {
      // Placeholder for actual authentication check logic
      // For example, checking token validity or fetching user profile
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async operation with a timeout
      setLoading(false); // Update loading state to false after check is complete
    };

    checkAuthStatus();
  }, []);
  console.log({ token });
  const routes = [
    {
      path: "/",
      element: <Home />,
    },

    { path: "/success", element: <SuccessPage /> },

    {
      path: "/404",
      element: <NotFoundPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
  if (loading) {
    // Return loader while the app is checking authentication status
    return <CustomLoader message="Loading..." />;
  }
  return (
    <Router>
      <NavBarMantine>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </NavBarMantine>
    </Router>
  );
}

export default App;
