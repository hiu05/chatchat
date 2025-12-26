import { create } from 'zustand'
import { authService } from '@/services/authService'
import type { AuthState, LoginType, SignUpType } from '@/type/authtype'
import { toast } from 'sonner'
import { AxiosError } from "axios";


export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  user: null,
  isLoading: false,

  sendOTP: async (email: string) => {
    try {
      const res = await authService.sendOTP(email);
      toast.success(res.message || "OTP đã được gửi thành công!");

    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(`Gửi OTP thất bại: ${err.response?.data?.message}`);
      } else {
        toast.error("Có lỗi xảy ra khi gửi OTP");
      }
    }

  },

  signUp: async (data: SignUpType) => {
    try {
      set({ isLoading: true })

      //call api
      const res = await authService.signUp(data)
      toast.success(res.message || "Đăng ký thành công")

    } catch {

      toast.error("Lỗi khi đăng ký");

    } finally {
      set({ isLoading: false })
    }
  },

  signIn: async (data: LoginType) => {
    try {
      set({ isLoading: true })
      const res = await authService.signIn(data)
      set({ accessToken: res.accessToken })
      toast.success(res.message || "Đăng Nhập thành công")

    } catch(err) {
      if (err instanceof AxiosError) {
        toast.error(`Đăng nhập thất bại: ${err.response?.data?.message}`);
      } else {
        toast.error("Có lỗi xảy ra khi đăng nhập");
      }
    } finally {
      set({ isLoading: false })
    }
  },

}))
