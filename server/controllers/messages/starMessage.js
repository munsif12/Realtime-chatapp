const Message = require('../../models/message');
const starMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { _id: userId } = req.user;
        if (!messageId) return res.status(400).json({ success: false, message: 'Message id is required' });

        let message = await Message.findOne({ messageId })

        if (!message) return res.status(400).json({ success: false, message: 'Message not found' });

        const starred = await Message.findOneAndUpdate({ _id: messageId, stars: { $ne: userId } }, { $push: { stars: userId } }, { new: true })

        if (!starred) return res.status(400).json({ success: false, message: 'Message already starred' });

        return res.status(200).json({
            success: true,
            message: 'Chat messages send successfully',
            starredMessage: starred
        })
    } catch (error) {
        return res.status(500).json({ success: true, message: error.message });
    }
}
module.exports = starMessage;