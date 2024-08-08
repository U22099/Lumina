import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LogIn from "./LogIn.jsx";
import Register from "./Register.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import EmailSent from "./EmailSent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <BrowserRouter basename="/Lumina-AI">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="homepage" element={<App />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="emailSent" element={<EmailSent />} />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>
);
