import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User registration
export const register = async (req, res) => {
    try {
        // Hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        });

        await newUser.save();

        res.status(200).json({ success: true, message: 'Successfully created' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create. Try again' });
    }
};

// User login
export const login = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });

        // if user doesn't exist
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // if user exists then check the password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        // if password is incorrect
        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        const { password, role, ...rest } = user._doc;

        // create jwt
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' });

        // set token in browser cookies and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
        }).cookie('userId', user._id.toString(), {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
        });

        res.status(200).json({
            token,
            data: { ...rest },
            role,
        });
    } catch (err) {
        res.status(401).json({ success: false, message: 'Failed to login' });
    }
};
