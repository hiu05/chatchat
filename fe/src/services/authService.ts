import api from "@/lib/api";
import type { SignUpType } from "@/type/authtype";

export const authService = {

    sendOTP: async(email: string) => {
        const res = await api.post('/api/auth/sendotp',{email})
        return res.data
    },

    signUp: async(payload: SignUpType) =>{
        const res = await api.post('api/auth/signup',{payload})
        return res.data
    }
}