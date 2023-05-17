import HomePage from "../../pages/home-page.jsx";
import AppHeader from "../app-header/app-header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/login-page.jsx";
import ForgotPassword from "../../pages/forgot-password.jsx";
import RegisterPage from "../../pages/register-page.jsx";
import ResetPasswordPage from "../../pages/reset-password-page.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
