import express from 'express';
import { syncUser, getUserProfile } from '../controllers/userController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/sync', verifyFirebaseToken, syncUser);
router.get('/me', verifyFirebaseToken, getUserProfile);

export default router;
