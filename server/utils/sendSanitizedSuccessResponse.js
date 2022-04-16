const signJwtToken = require("./signJWT");

function SEND_SANITIZED_SUCCESS_RESPONSE(user, res, resType = 'login') {
    const token = signJwtToken(user._id);
    let { password, __v, ...rest } = user;
    // delete user.password; //dont send the password and unwanted data back to client
    return res.status(200).json({ success: true, message: `User ${resType === "login" ? 'login' : 'created'} succesfully`, user: rest, token })
}
module.exports = SEND_SANITIZED_SUCCESS_RESPONSE;