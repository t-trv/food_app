import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CategoryContextProvider } from "./context/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <AuthContextProvider>
      <CategoryContextProvider>
        <App />
      </CategoryContextProvider>
      <Toaster position="bottom-right" />
    </AuthContextProvider>
  </>
);
