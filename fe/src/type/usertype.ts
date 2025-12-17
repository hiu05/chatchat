export interface User {
    _id: string;
    username: string;
    displayName?: string;
    phone?: string;
    password: string;
    email: string;
    role: string;
    personalizeId: string
}