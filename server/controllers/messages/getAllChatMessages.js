const Message = require('../../models/message');
const Chat = require('../../models/chat');
const getAllChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: 'Chat Id required'
            });
        }
        const chatExists = await Chat.findOne({ _id: chatId })
        if (!chatExists) {
            return res.status(400).json({
                success: false,
                message: 'Chat does not exists'
            })
        }
        const chatMessages = await Message.find({ chatId })
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
                populate: {
                    path: 'users',
                    select: '-password -__v'
                }
            });;
        return res.status(200).json({
            success: true,
            message: 'Chat messages send successfully',
            messages: chatMessages
        })
    } catch (error) {
        return res.status(500).json({ success: true, message: error.message });
    }
}
module.exports = getAllChatMessages;