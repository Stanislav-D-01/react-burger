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
import ModalOrder from "../../pages/modal-order";
import ViewIngredientPage from "../../pages/view-ingredient-page";
import ErrorPage from "../../pages/404-page";
import Profile from "../profile/profile";
import HistoryOrderPage from "../../pages/history-order-page";

const ModalSwitch = () => {
  const name = useSelector((store) => store.auth.name);
  const requestAuth = useSelector((store) => store.auth.request);
  const requestOrder = useSelector((store) => store.order.orderRequest);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!name && !requestAuth) {
      dispatch(checkAuthorization(name, "token", "refreshToken"));
    }
  }, [name]);
  let location = useLocation();
  let background = location.state && location.state.background;
  if (!requestAuth) {
    return (
      <>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route element={<ProtectedRouteElement element={<ProfilePage />} />}>
            <Route
              path="/profile"
              element={<ProtectedRouteElement element={<Profile />} />}
            />
            <Route
              path="/history-order"
              element={<ProtectedRouteElement element={<HistoryOrderPage />} />}
            />
          </Route>
          <Route path="/ingredients/:_id" element={<ViewIngredientPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Routes>
          {background && (
            <Route
              path="/ingredients/:_id"
              exact
              element={<ModalIngredient />}
            />
          )}
          {background && !requestOrder && (
            <Route path="/order-details" exact element={<ModalOrder />} />
          )}
        </Routes>
      </>
    );
  }
};

export default ModalSwitch;
