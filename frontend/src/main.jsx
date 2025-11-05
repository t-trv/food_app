import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./configs/queryClient.js";

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
        <Toaster position="bottom-right" />
      </AuthContextProvider>
    </QueryClientProvider>
  </>
);
