import type { User } from "./usertype";

export interface LoginType {
    username: string,
    password: string,
}
export interface SignUpType extends LoginType {
    email: string,
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

    signIn: (data: LoginType) => Promise<void>,

}