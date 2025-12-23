import express from 'express';
import {AuthRouter} from './authRouter.js';
import {UserRouter}from './userRouter.js';

const router = express.Router();

router.use('/v1', AuthRouter)
router.use('/v1', UserRouter)

export const APIs_v1 =  router