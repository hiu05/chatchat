import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './libs/db.js';

dotenv.config({quiet: true});

const app = express();

app.use(express.json());
app.use(cors());

// Import routers
import authRouter from './routes/authRouter.js';

// public
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// private
app.use('/auth', authRouter);



const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});