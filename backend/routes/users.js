import express from 'express';
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and admin only
router.use(auth);
router.use(authorize('admin'));

// User routes
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router; 