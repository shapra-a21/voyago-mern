import express from 'express';
import { updateUser, deleteUser, getSingleUser, getAllUser } from '../controllers/userController.js';
const router = express.Router();

import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

// Update User
router.put('/:id', verifyUser, updateUser);

// Delete User
router.delete('/:id', verifyUser, deleteUser);

// Get single User
router.get('/:id', verifyUser, getSingleUser);

// Get all Users
router.get('/', verifyAdmin, getAllUser);

export default router;
