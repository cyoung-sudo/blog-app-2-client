import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Routing
import { BrowserRouter } from "react-router-dom";
// App
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)