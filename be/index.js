import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './libs/db.js';
import cookieParser from 'cookie-parser';
dotenv.config({quiet: true});

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Import routers
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import { privateRoute } from './middleware/authMiddleware.js';

// public
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRouter);

// private
app.use('/api/user',privateRoute , userRouter);


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});