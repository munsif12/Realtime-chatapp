const Message = require('../../models/message');
const starMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { star } = req.query;
        if (!messageId) return res.status(400).json({ success: false, message: 'Message id is required' });

        const starredMessage = await Message.findByIdAndUpdate({ _id: messageId }, { star }, { new: true })
            .populate({
                path: 'senderId',
                select: '-password -__v'
            })
            .populate({
                path: 'recieverId',
                select: '-password -__v'
            })
            .populate({
                path: 'chatId',
                select: '-users -__v'
            });
        if (!starredMessage) return res.status(400).json({ success: false, message: 'Message not found' });

        return res.status(200).json({
            success: true,
            message: 'Chat messages send successfully',
            starredMessage
        })
    } catch (error) {
        return res.status(500).json({ success: true, message: error.message });
    }
}
module.exports = starMessage;