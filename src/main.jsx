import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AsgardeoProvider } from "@asgardeo/react"

const root = createRoot(document.getElementById("root"));

const clientId = import.meta.env.VITE_ASGARDEO_CLIENT_ID;
const baseUrl = import.meta.env.VITE_ASGARDEO_BASE_URL;

// const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleClientId = "288242518278-fn2dg6830vf4sstgd7qri10501ve7i20.apps.googleusercontent.com";

root.render(
  <BrowserRouter>
      <AsgardeoProvider
        clientId={clientId}
        baseUrl={baseUrl}
      >
        <App />
        <Toaster position="bottom-right" />
      </AsgardeoProvider>
  </BrowserRouter>
);
