import express from 'express';
import {AuthRouter} from './authRouter.js';
import {UserRouter}from './userRouter.js';

const Router = express.Router();

Router.use('/v1', AuthRouter)
Router.use('/v1', UserRouter)

export const APIs_v1 =  Router