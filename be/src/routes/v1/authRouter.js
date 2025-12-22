import express from 'express';
import { AuthControllers }  from '#controllers/authController.js';

const router = express.Router();

router.post('/signin', AuthControllers.signIn);
router.post('/signup', AuthControllers.signUp);
router.post('/signout', AuthControllers.signOut);
router.post('/sendotp', AuthControllers.sendOTP);

export const AuthRouter = router;