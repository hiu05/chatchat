import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  // Field,
  FieldDescription,
  // FieldGroup,
  // FieldLabel,
  // FieldSeparator,
} from "@/components/ui/field"
import { User, KeyRound } from "lucide-react"
import { InputField } from "./InputField"
import { useForm } from "react-hook-form"
import { signUpSchema } from "@/lib/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/store/useAuthStore"
import type { SignUpFormValues } from "@/lib/formSchema"
// const language = {
//   vi: {
//     title: "Đăng ký",
//     username: "Tên người dùng",
//     password: "Mật khẩu",
//     submit: "Gửi"
//   },
//   en: {
//     title: "Sign Up",
//     username: "Username",
//     password: "Password",
//     submit: "Submit"
//   }
// };

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, getValues } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  })
  const { sendOTP, signUp } = useAuthStore()

  const handleVerify = async () => {
    const isValid = await trigger("email");

    if (!isValid) {
      // nếu email không hợp lệ thì dừng lại
      return;
    }
    const email = getValues("email");

    await sendOTP(email)

  }

  const handleRegister = async (data: SignUpFormValues) => {

    // const {username, password, verifyCode, email, displayName} = data
    await signUp(data)


  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col gap-6">
              <div className="flex gap-1 items-center justify-center " >
                <a href="/" className="">
                  <img src="/chitchat.png" alt="" className="w-10" />
                </a>
                <h1 className="text-xl text-gray-700">Tạo tài khoản ChitChat</h1>
              </div>
            </div>
            <div className="flex flex-col gap-4">

              <InputField
                id="displayName"
                label="Họ và Tên"
                icon={<User />}
                placeholder="Nhập họ và tên"
                register={register("displayName")}
                error={errors.displayName?.message}
              />

              <InputField
                id="username"
                label="Tên đăng nhập"
                icon={<User />}
                placeholder="username"
                error={errors.username?.message}
                register={register("username")}
              />

              <InputField
                id="password"
                label="Mật khẩu"
                icon={<KeyRound />}
                type="password"
                placeholder="password"
                register={register("password")}
                error={errors.password?.message}
              />

              <InputField
                id="confirmPass"
                label="Xác nhận mật khẩu"
                icon={<KeyRound />}
                type="password"
                placeholder="confirm password"
                register={register("confirmPass")}
                error={errors.confirmPass?.message}
              />

              <InputField
                id="email"
                label="Email"
                type="email"
                register={register("email")}
                placeholder="email@example.com"
                error={errors.email?.message}
              />
              <div className="flex flex-row w-full justify-content gap-2">
                <InputField
                  id="verifyCode"
                  className="w-full"
                  placeholder="Nhập mã xác thực"
                  register={register("verifyCode")}
                  error={errors.verifyCode?.message}
                />
                <Button type="button" onClick={handleVerify}>Nhận mã</Button>
              </div>
              {/* submit */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Đăng ký"}
              </Button>
              <FieldDescription className="text-center">
                <div>You&apos;re already have an account? <a href="/login"><u>Login</u></a></div>
                </FieldDescription>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
