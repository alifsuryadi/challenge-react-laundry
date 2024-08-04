import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ProductProvider } from "./components/ProductContext"; // Pastikan impor ProductProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <ProductProvider>
          <App />
        </ProductProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
