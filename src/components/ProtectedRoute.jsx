import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ element, isAdmin = false }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    try {
      const adminUser = JSON.parse(localStorage.getItem("adminUser"));
      
      if (!adminUser) {
        setIsAuthorized(false);
        return;
      }

      if (isAdmin && !adminUser.isAdmin) {
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthorized(false);
    }
  }, [isAdmin]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/admin-login" replace />;
  }

  return element;
};

export default ProtectedRoute;
