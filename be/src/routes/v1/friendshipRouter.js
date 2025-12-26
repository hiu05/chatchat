import { FriendshipController } from "#controllers/friendship.controller.js";
import express from "express";

const router = express.Router()

router.post('/send-request',FriendshipController.sendRequest)
router.post('/accept-request', FriendshipController.acceptRequest)
router.get('/', FriendshipController.getFriends)

export const FriendshipRouter = router;