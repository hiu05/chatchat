import { z } from "zod";

// Schema cơ bản cho login
export const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập chưa có"),
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// signup kế thừa schema login
export const signUpSchema = loginSchema.extend({
  displayName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  confirmPass: z.string().min(1, "Chưa xác nhận"),
  verifyCode: z.string().min(6, "Phải có ít nhất 6 ký tự"),
}).refine((data) => data.password === data.confirmPass, {
  message: "Mật khẩu và xác nhận mật khẩu không khớp",
  path: ["confirmPass"],
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
