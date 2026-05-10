import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import {
  BrowserRouter
} from "react-router-dom";

import {
  QueryProvider
} from "./providers/query-provider";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <App />
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);