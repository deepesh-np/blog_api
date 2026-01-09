import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};
export default ProtectedRoute;