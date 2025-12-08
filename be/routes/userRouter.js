import { Router } from "express";
import { getUserProfile } from "../controllers/userController.js";

const router = Router();

router.get("/me", getUserProfile);

export default router;