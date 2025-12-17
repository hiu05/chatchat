import type { User } from "./usertype";

export interface SignUpType {
    username: string,
    email: string,
    password: string,
    phone?: string,
    displayName:string,
    verifyCode: string,
}

export interface AuthState {
    accessToken: string | null,
    user: User | null,
    isLoading: boolean,

    sendOTP: (email: string) => Promise<void>,

    signUp: (data: SignUpType) => Promise<void>,


}