import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"; 
import { AuthProvider } from "./context/AuthContext";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>
);
