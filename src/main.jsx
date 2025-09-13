import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = createRoot(document.getElementById("root"));

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const scope = "openid profile delete:resources write:advices access:admin";

// const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleClientId = "288242518278-fn2dg6830vf4sstgd7qri10501ve7i20.apps.googleusercontent.com";

root.render(
  <BrowserRouter>
      <AsgardeoProvider
        clientId=""
        baseUrl=""
      >
        <App />
        <Toaster position="bottom-right" />
      </AsgardeoProvider>
  </BrowserRouter>
);
