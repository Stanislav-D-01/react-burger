import { useLocation } from "react-router-dom";
import ModalIngredient from "../../pages/modal-ingredient";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/home-page.jsx";
import AppHeader from "../app-header/app-header.jsx";

import LoginPage from "../../pages/login-page.jsx";
import ForgotPassword from "../../pages/forgot-password.jsx";
import RegisterPage from "../../pages/register-page.jsx";
import ResetPasswordPage from "../../pages/reset-password-page.jsx";
import ProfilePage from "../../pages/profile-page.jsx";
import ProtectedRouteElement from "../protected-route-element/protected-route-element.jsx";
import { useEffect } from "react";
import { checkAuthorization } from "../../services/actions/check-autorization.jsx";
import { useDispatch, useSelector } from "react-redux";

const ModalSwitch = () => {
  const name = useSelector((store) => store.auth.name);
  const request = useSelector((store) => store.auth.request);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthorization(name, "token", "refreshToken"));
  }, []);
  let location = useLocation();
  let background = location.state && location.state.background;
  console.log(location);

  return (
    <>
      <Routes location={background}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
      </Routes>

      <Routes>
        {background && (
          <Route path="/ingredients/:_id" exact element={<ModalIngredient />} />
        )}
      </Routes>
    </>
  );
};

export default ModalSwitch;
