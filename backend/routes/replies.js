import express from 'express';
import { 
  getReplies, 
  addReply, 
  updateReply, 
  deleteReply 
} from '../controllers/replyController.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

// Reply routes
router.route('/tickets/:ticketId/replies')
  .get(getReplies)
  .post(addReply);

router.route('/:id')
  .put(updateReply)
  .delete(deleteReply);

export default router; 