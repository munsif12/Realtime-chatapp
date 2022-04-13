
const chats = require('../../data')
function getAllChats(req, res) {
    return res.status(200).json({ success: true, chats })
}

module.exports = getAllChats;