import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const root = createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
      <App />
      <Toaster position="bottom-right" />
  </BrowserRouter>
);
