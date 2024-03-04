import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.module.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import theme from "./theme";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
