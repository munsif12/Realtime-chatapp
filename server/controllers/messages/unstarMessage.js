const Message = require('../../models/message');
const unstarMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { _id: userId } = req.user;
        if (!messageId) return res.status(400).json({ success: false, message: 'Message id is required' });

        let message = await Message.findOne({ messageId })

        if (!message) return res.status(400).json({ success: false, message: 'Message not found' });

        const unStarred = await Message.findOneAndUpdate({ _id: messageId, stars: userId }, { $pull: { stars: userId } }, { new: true })

        if (!unStarred) return res.status(400).json({ success: false, message: 'Message already unstarred' });

        return res.status(200).json({
            success: true,
            message: 'Chat messages send successfully',
            starredMessage: unStarred
        })
    } catch (error) {
        return res.status(500).json({ success: true, message: error.message });
    }
}
module.exports = unstarMessage;