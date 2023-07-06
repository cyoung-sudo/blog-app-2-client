import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Routing
import { BrowserRouter } from "react-router-dom";
// Redux
import store from "./app/store";
import { Provider } from "react-redux";
// App
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider> 
  </React.StrictMode>
)