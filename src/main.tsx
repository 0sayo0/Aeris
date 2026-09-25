import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/raleway";
import "./index.css";

import AppProviders from "./app/providers";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
