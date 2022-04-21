const User = require('../models/user');
const jwt = require('jsonwebtoken')
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access! Please sign in to continue.'
        });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access! Please sign in to continue.'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //check if user exists
        const user = await User.findById(decoded.id).select("-password -__v");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access! User not exists'
            });
        }

        //inject the user to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: error.message
        });
    }
}
module.exports = authMiddleware;