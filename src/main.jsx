import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login/Login.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const scope = "openid profile delete:resources";

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={auth0Domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(audience ? { audience: audience } : null),
        ...(scope ? { scope: scope } : null),
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
