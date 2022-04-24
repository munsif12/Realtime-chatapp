const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const checkToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'No token provided'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token'
            });
        }
        const user = await User.findOne({ _id: decoded.id }).select('-password -__v');
        res.json({
            success: true,
            message: 'Token is valid',
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        })
    }
}
module.exports = checkToken;