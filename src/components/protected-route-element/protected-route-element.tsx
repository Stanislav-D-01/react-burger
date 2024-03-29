import { useSelector } from "../../services/types/hooks-types";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { checkAuthorization } from "../../services/actions/check-autorization";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { PATH_HOME_PAGE, PATH_LOGIN } from "../../utils/utils";

type TProtectedRouteElement = {
  element: JSX.Element;
  onlyUnAuth?: boolean;
};

const ProtectedRouteElement = ({
  element,
  onlyUnAuth = false,
}: TProtectedRouteElement) => {
  const { name, email, request } = useSelector((store) => ({
    name: store.auth.name,
    email: store.auth.email,
    request: store.auth.request,
  }));

  const location = useLocation();

  if (name && email && !onlyUnAuth && !request) {
    return element;
  }
  if (!name && !email && onlyUnAuth && !request) {
    return element;
  }
  if (!name && !email && !onlyUnAuth && !request) {
    return <Navigate to={PATH_LOGIN} state={{ history: location.pathname }} />;
  }
  if (name && email && onlyUnAuth && !request) {
    return <Navigate to={location.state.history} />;
  } else return <></>;
};

export default ProtectedRouteElement;
