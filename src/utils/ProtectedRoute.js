// Routing
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ authUser, children }) => {
  if (!authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;