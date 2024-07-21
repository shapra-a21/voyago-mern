import Booking from '../models/Booking.js';

// Membuat booking baru
export const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(200).json({
            success: true,
            message: 'Booking Anda telah berhasil dibuat.',
            data: savedBooking
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal membuat booking.',
            error: err.message
        });
    }
};

export const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking tidak ditemukan'
            });
        }
        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil booking.',
            error: err.message
        });
    }
};

// Mengambil semua booking
export const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil daftar booking.',
            error: err.message
        });
    }
};
