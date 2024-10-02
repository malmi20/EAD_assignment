import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContextProvider from "./context/AuthContext";
import "./styles.scss";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
    <AuthContextProvider>
      
        <App />
      
    </AuthContextProvider>
  </Router>
);
reportWebVitals();
