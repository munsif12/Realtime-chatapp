const jwt = require('jsonwebtoken');
function signJwtToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}
module.exports = signJwtToken;