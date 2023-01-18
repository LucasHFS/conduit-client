import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const UserOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  return isAuthenticated === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export const GuestOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  return isAuthenticated === false ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
};
