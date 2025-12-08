import express from 'express';
import { signIn, signUp, signOut } from '../controllers/authController.js';
import { sendOTP } from '../controllers/otpController.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/signout', signOut);
router.post('/sendotp', sendOTP);

export default router;