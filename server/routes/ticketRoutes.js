import express from 'express';
import { purchaseTicket, getUserTickets, checkInTicket } from '../controllers/ticketController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Require auth for all ticket routes
router.use(verifyFirebaseToken); 

router.post('/purchase', purchaseTicket);
router.get('/my-tickets', getUserTickets);
router.post('/checkin', checkInTicket); // For organizers scanning QR codes

export default router;
