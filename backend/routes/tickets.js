import express from 'express';
import { 
  getTickets, 
  getTicket, 
  createTicket, 
  updateTicket, 
  deleteTicket 
} from '../controllers/ticketController.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

// Ticket routes
router.route('/')
  .get(getTickets)
  .post(createTicket);

router.route('/:id')
  .get(getTicket)
  .put(updateTicket)
  .delete(authorize('admin'), deleteTicket);

export default router; 