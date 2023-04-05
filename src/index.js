import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
