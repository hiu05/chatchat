import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export const env = {
    CONNECT_MONGODB_URI : process.env.CONNECT_MONGODB_URI,
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS,
    CORS_ORIGINS : process.env.CORS_ORIGINS
}