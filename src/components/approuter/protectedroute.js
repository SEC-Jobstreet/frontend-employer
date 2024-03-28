import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectUser } from "../../store/user";

function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (user.email === "") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default ProtectedRoute;
