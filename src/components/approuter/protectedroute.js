import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirectPath = "/" }) {
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
