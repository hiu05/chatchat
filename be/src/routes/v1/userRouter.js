import { UserControllers } from "#controllers/userController.js";
import express from "express";

const router = express.Router()

router.route('/profile')
    .get(UserControllers.getUserProfile)

export const UserRouter = router;