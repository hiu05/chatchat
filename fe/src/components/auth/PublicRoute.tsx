import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

function PublicRoute() {
    const {accessToken} = useAuthStore()
   
  if (accessToken) {
    // Nếu đã có token thì chuyển về trang chủ
    return <Navigate to="/" replace />;
  }

  // Nếu chưa có token thì cho vào các route con (login, signup)
  return <Outlet />;
}

export default PublicRoute;