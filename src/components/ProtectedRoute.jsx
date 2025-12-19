import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAdmin = false }) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  
  if (!adminUser) {
    return <Navigate to="/admin-login" replace />;
  }

  if (isAdmin && !adminUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
