import express from 'express';
import {AuthRouter} from './authRouter.js';
import {UserRouter}from './userRouter.js';
import { FriendshipRouter } from './friendshipRouter.js';

const router = express.Router();

router.use('/v1/auth', AuthRouter)
router.use('/v1/user', UserRouter)
router.use('/v1/friendship', FriendshipRouter)

export const APIs_v1 =  router