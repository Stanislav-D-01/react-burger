import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthorization } from "../../services/actions/check-autorization";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const ProtectedRouteElement = ({ element }) => {
  const { name, email } = useSelector((store) => ({
    name: store.auth.name,
    email: store.auth.email,
    autorization: store.auth.autorization,
  }));
  const dispatch = useDispatch();

  if (name && email) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRouteElement;
