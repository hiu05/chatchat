import { UserControllers } from "#controllers/userController.js";
import express from "express";

const router = express.Router()

router.route('user/profile')
    .get(UserControllers.getUserProfile)

export const UserRouter = router;