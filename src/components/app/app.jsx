import HomePage from "../../pages/home-page.jsx";
import AppHeader from "../app-header/app-header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/login-page.jsx";
import ForgotPassword from "../../pages/forgot-password.jsx";
import RegisterPage from "../../pages/register-page.jsx";
import ResetPasswordPage from "../../pages/reset-password-page.jsx";
import ProfilePage from "../../pages/profile-page.jsx";
import ProtectedRouteElement from "../protected-route-element/protected-route-element.jsx";
import { useEffect } from "react";
import { checkAuthorization } from "../../services/actions/check-autorization.jsx";
import { useDispatch, useSelector } from "react-redux";
import ModalIngredient from "../../pages/modal-ingredient.jsx";
import ModalSwitch from "../modal-switch/modal-switch.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <ModalSwitch />
      </BrowserRouter>
    </>
  );
}

export default App;
