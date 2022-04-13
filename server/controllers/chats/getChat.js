const chats = require('../../data')
function getChat(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'id is required' })
    }

    const chat = chats.find(chat => chat._id === id);

    if (!chat) {
        return res.status(404).json({ success: false, message: 'chat not found' })
    }
    return res.status(200).json({ success: true, chat })
}

module.exports = getChat;