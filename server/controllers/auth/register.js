const User = require('../../models/user');
const signJwtToken = require('../../utils/signJWT');
const SEND_SANITIZED_SUCCESS_RESPONSE = require('../../utils/sendSanitizedSuccessResponse');


const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
async function register(req, res) {
    const { name, email, password, profileImage } = req.body;

    let userDetails = {};
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill out the form' })
        }
        userDetails = { name, email, password }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' })
        }

        //if profile image exists then add it to userDetails
        if (profileImage) {
            userDetails.profileImage = profileImage;
        }

        const newUser = await User.create(userDetails)
        if (!newUser) {
            return res.status(400).json({ success: false, message: 'User not created' })
        }

        //if you dont add .toObject you will get meta-deta values from mongose then you will not be able to delte the password
        SEND_SANITIZED_SUCCESS_RESPONSE(newUser.toObject(), res, 'register');
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, error })
    }
}

module.exports = register;