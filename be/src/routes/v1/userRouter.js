import { UserControllers } from "#controllers/userController.js";
import express from "express";

const router = express.Router()

router.route('user/:id')
    .get(UserControllers.getUserProfile)

export const UserRouter = router;