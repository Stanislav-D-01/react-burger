import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthorization } from "../../services/actions/check-autorization";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { PATH_HOME_PAGE, PATH_LOGIN } from "../../utils/utils";
const ProtectedRouteElement = ({ element, onlyUnAuth }) => {
  const { name, email, request } = useSelector((store) => ({
    name: store.auth.name,
    email: store.auth.email,
    request: store.auth.request,
  }));
  const dispatch = useDispatch();

  if (name && email && !onlyUnAuth && !request) {
    return element;
  }
  if (!name && !email && onlyUnAuth && !request) {
    return element;
  }
  if (!name && !email && !onlyUnAuth && !request) {
    return <Navigate to={PATH_LOGIN} replace />;
  }
  if (name && email && onlyUnAuth && !request) {
    return <Navigate to={PATH_HOME_PAGE} replace />;
  }
};

export default ProtectedRouteElement;
