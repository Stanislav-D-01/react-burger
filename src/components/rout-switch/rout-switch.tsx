import { useLocation } from "react-router-dom";
import ModalIngredient from "../../pages/modal-ingredient";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/home-page";
import AppHeader from "../app-header/app-header";

import LoginPage from "../../pages/login-page";
import ForgotPassword from "../../pages/forgot-password";
import RegisterPage from "../../pages/register-page";
import ResetPasswordPage from "../../pages/reset-password-page";
import ProfilePage from "../../pages/profile-page";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import { useEffect } from "react";
import { checkAuthorization } from "../../services/actions/check-autorization";

import ModalOrder from "../../pages/modal-order";
import ViewIngredientPage from "../../pages/view-ingredient-page";
import ErrorPage from "../../pages/404-page";
import Profile from "../profile/profile";
import HistoryOrderPage from "../../pages/profile-orders-page";
import {
  PATH_HOME_PAGE,
  PATH_LOGIN,
  PATH_FORGOT_PASS,
  PATH_REGISTER,
  PATH_RESET_PASS,
  PATH_PROFILE,
  PATH_PROFILE_ORDERS,
  PATH_INGREDIENTS,
  PATH_ORDER,
  PATH_FEED,
} from "../../utils/utils";
import FeedsPage from "../../pages/feeds-page";
import OrderViewPage from "../../pages/order-view-page";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { RootState } from "../../index";
import { useSelector } from "../../services/types/hooks-types";
import { useDispatch } from "../../services/types/hooks-types";
import ModalOrderFeed from "../../pages/modal-order-feed";

const RoutSwitch = () => {
  const name = useSelector((store) => store.auth.name);
  const requestAuth = useSelector((store) => store.auth.request);
  const requestOrder = useSelector((store) => store.order.orderRequest);
  const loadEnd = useSelector((store) => store.auth.loadEnd);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!name && !requestAuth) {
      dispatch(checkAuthorization());
    }
    if (!ingredients) {
      dispatch(getIngredients());
    }
  }, []);

  let location = useLocation();
  let background = location.state && location.state.background;

  if (!requestAuth && loadEnd) {
    return (
      <>
        <Routes location={background || location}>
          <Route path={PATH_HOME_PAGE} element={<HomePage />} />

          <Route
            path={PATH_LOGIN}
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<LoginPage />}
              />
            }
          />
          <Route path={PATH_FORGOT_PASS} element={<ForgotPassword />} />
          <Route
            path={PATH_REGISTER}
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<RegisterPage />}
              />
            }
          />
          <Route path={PATH_RESET_PASS} element={<ResetPasswordPage />} />

          <Route element={<ProtectedRouteElement element={<ProfilePage />} />}>
            <Route
              path={PATH_PROFILE}
              element={<ProtectedRouteElement element={<Profile />} />}
            />
            <Route
              path={PATH_PROFILE_ORDERS}
              element={<ProtectedRouteElement element={<HistoryOrderPage />} />}
            />
          </Route>
          <Route
            path={`${PATH_PROFILE_ORDERS}/:_id`}
            element={<ProtectedRouteElement element={<OrderViewPage />} />}
          />
          <Route path={PATH_FEED} element={<FeedsPage />} />
          <Route path={`${PATH_FEED}/:id`} element={<OrderViewPage />} />
          <Route
            path={`${PATH_INGREDIENTS}/:_id`}
            element={<ViewIngredientPage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Routes>
          {background && (
            <Route
              path={`${PATH_INGREDIENTS}/:_id`}
              element={<ModalIngredient />}
            />
          )}
          {background && !requestOrder && (
            <Route path={PATH_ORDER} element={<ModalOrder />} />
          )}
          {background && (
            <Route path={`${PATH_FEED}/:id`} element={<ModalOrderFeed />} />
          )}
        </Routes>
      </>
    );
  } else return <></>;
};

export default RoutSwitch;
