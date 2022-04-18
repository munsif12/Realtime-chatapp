const User = require('../../models/user');
const SEND_SANITIZED_SUCCESS_RESPONSE = require('../../utils/sendSanitizedSuccessResponse');
// const signJwtToken = require('../../config/signJWT');

async function login(req, res) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }

        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Email or password'
            });
        }

        const userVerified = await userExists.bcryptComparePassword(password);
        if (!userVerified) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or Password'
            });
        }

        SEND_SANITIZED_SUCCESS_RESPONSE(userExists.toObject(), res, 'login');
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = login;