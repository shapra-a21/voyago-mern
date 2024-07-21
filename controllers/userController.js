import User from '../models/User.js';

// Create new User
export const createUser= async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User successfully created',
            data: savedUser
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: `Failed to create User. Please try again. ${err.message}` 
        });
    }
};

// Update User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser= await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User successfully updated',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Failed to update. ${err.message}`
        });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser= await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User successfully deleted',
            data: deletedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Failed to delete. ${err.message}`
        });
    }
};

// Get single User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User found',
            data: user
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: `Failed to find user with id ${id}. Please try again. ${err.message}` 
        });
    }
};

// Get all Users
export const getAllUser= async (req, res) => {
    try {
        const users = await User.find({})
        
        res.status(200).json({
            success: true,
            count: users.length,
            message: 'Successful',
            data: users
        });
    } catch (err) {
        res.status(404).json({ 
            success: false, 
            message: `Not Found. ${err.message}` 
        });
    }
};