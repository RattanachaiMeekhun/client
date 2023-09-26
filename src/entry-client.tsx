import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";

// Replace ReactDOM.hydrate with hydrateRoot
hydrate(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
