import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    console.log(res.cookie())
    const token = req.cookies.accessToken;
  

    if (!token) {
        return res.status(402).json({ success: false, message: "You're not authorized" });
    }

    // if token exists then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        req.user = user;
        next(); // don't forget to call next
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.cookies.userId || req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated" });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized" });
        }
    });
};
