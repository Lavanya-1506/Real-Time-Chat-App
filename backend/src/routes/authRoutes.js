import express from 'express';
import { logout ,login,signup, updateProfile,checkAuth} from '../controllers/authControllers.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
const router= express.Router();

router.post('/signup', signup )

router.post('/login',login)

router.get('/logout', logout)

router.put('/update-profile',protectedRoute, updateProfile)

router.get('/check', protectedRoute, checkAuth)  //if the user is authenticated then this function is called


export default router;