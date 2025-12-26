import { Navigate } from "react-router";
import { LoginForm } from "@/components/auth"
import Cookies from "js-cookie";

export default function LoginPage() {
  const token = Cookies.get("token"); // lấy token từ cookie

  if (token) {
    return <Navigate to="/" relative="route" replace/>
  }

  return (
    
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}