import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {
  const { name, email } = useSelector((store) => ({
    name: store.auth.name,
    email: store.auth.email,
  }));
  const navigate = useNavigate();

  if (name && email) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRouteElement;
