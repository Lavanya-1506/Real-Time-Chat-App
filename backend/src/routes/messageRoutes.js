import express from 'express'
import { getUsersforSideBar , getMessages, sendMessage } from '../controllers/messageController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router= express.Router()

router.get("/users", protectedRoute, getUsersforSideBar)

router.get("/:id", protectedRoute, getMessages)

router.post("/send/:id", protectedRoute, sendMessage)
export default router;