import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@asgardeo/auth-react";

const root = createRoot(document.getElementById("root"));

// Asgardeo configuration
const config = {
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "yC7UNGj7suGPk1jylBCAwZ5LVuwa",
  baseUrl: "https://localhost:9443",
  scope: ["openid", "profile", "email", "roles"]
};

root.render(
  <BrowserRouter>
    <AuthProvider config={config}>
      <App />
      <Toaster position="bottom-right" />
    </AuthProvider>
  </BrowserRouter>
);
