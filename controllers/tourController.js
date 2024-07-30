import Tour from '../models/Tour.js';

// Create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: 'Tour successfully created',
            data: savedTour
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: `Failed to create tour. Please try again. ${err.message}` 
        });
    }
};

// Update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        if (!updatedTour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tour successfully updated',
            data: updatedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Failed to update. ${err.message}`
        });
    }
};

// Delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tour successfully deleted',
            data: deletedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Failed to delete. ${err.message}`
        });
    }
};

// Get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate("reviews");

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tour found',
            data: tour
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: `Failed to find tour with id ${id}. Please try again. ${err.message}` 
        });
    }
};

// Get all tours
export const getAllTour = async (req, res) => {
    try {
        // For pagination
        const page = parseInt(req.query.page) || 0;

        const tours = await Tour.find({})
            .populate("reviews")
            .skip(page * 8)
            .limit(8);

        console.log(tours)

        res.status(200).json({
            success: true,
            count: tours.length,
            message: 'Successful',
            data: tours
        });
    } catch (err) {
        res.status(404).json({ 
            success: false, 
            message: `Not Found. ${err.message}` 
        });
    }
};

// Get tour by search
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({ 
            city, 
            distance: { $gte: distance }, 
            maxGroupSize: { $gte: maxGroupSize } 
        }).populate("reviews");
        
        res.status(200).json({
            success: true,
            count: tours.length,
            message: 'Successful',
            data: tours
        });
    } catch (err) {
        res.status(404).json({ 
            success: false, 
            message: `Not Found. ${err.message}` 
        });
    }
};

// Get featured tour
export const getFeaturedTour = async (req, res) => {

    try {

        const tours = await Tour.find({featured:true}).populate("reviews").limit(8);

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: tours
        });
    } catch (err) {
        res.status(404).json({ 
            success: false, 
            message: `Not Found. ${err.message}` 
        });
    }
};


// get tour counts
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            data: tourCount
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: 'failed to fetch.'
        });
    }
}