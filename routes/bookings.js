import express from 'express';
import { createBooking, getBooking, getAllBooking } from '../controllers/bookingController.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Endpoint untuk membuat booking, hanya bisa diakses oleh pengguna yang terotentikasi
router.post('/', verifyUser, createBooking); 

// Endpoint untuk mendapatkan booking berdasarkan ID, hanya bisa diakses oleh pengguna yang terotentikasi
router.get('/:id', verifyUser, getBooking); 

// Endpoint untuk mendapatkan semua booking, hanya bisa diakses oleh admin yang terotentikasi
router.get('/', verifyAdmin, getAllBooking);

export default router;
