import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const {accessToken} = useAuthStore()
  
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRoute;
