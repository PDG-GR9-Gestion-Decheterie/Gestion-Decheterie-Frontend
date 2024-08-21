import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { userId } = useAuth();
  if (!userId) {
    return <Navigate to="/login" />;
  }
  return children;
};
