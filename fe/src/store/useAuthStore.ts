import { create } from 'zustand'
import { authService } from '@/services/authService'
import type { AuthState, SignUpType } from '@/type/authtype'
import { toast } from 'sonner'

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  user: null,
  isLoading: false,

  sendOTP: async (email: string) => {     
  try {
    const res = await authService.sendOTP(email);
    toast.success(res.message || "OTP đã được gửi thành công!");

  } catch (err: any){

    toast.error(`Gửi OTP thất bại: ${err.response.data.message}`);
    
  }

  },

  signUp: async (data: SignUpType) => {
    try{
      set({isLoading: true})

      //call api
      const res = await authService.signUp(data)
      toast.success(res.message ||"Đăng ký thành công")

    } catch  {

      toast.error("Lỗi khi đăng ký");

    } finally {
      set({isLoading: false})
    }
  },

}))
