import api from "@/lib/api";
import type { LoginType, SignUpType } from "@/type/authtype";

export const authService = {

    sendOTP: async(email: string) => {
        const res = await api.post('/api/v1/auth/sendotp',{email})
        return res.data
    },

    signUp: async(payload: SignUpType) =>{
        const res = await api.post('api/v1/auth/signup',{payload})
        return res.data
    },

    signIn: async(payload: LoginType) => {
        const res = await api.post('api/v1/auth/signin',{payload})
        return res.data
    },

}