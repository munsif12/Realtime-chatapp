const Message = require('../models/message');
const sendMessage = async (req, res) => {
    try {
        //which chat is this message going to--which user is sending this message--which user is receiving this message--which message is this
        const { chatId, senderId, recieverId, message } = req.body;
        if (!chatId || !senderId || !recieverId || !message) {
            return res.status(400).json({
                success: false,
                message: 'Chat Id, Sender, Reciever and Message required'
            });
        }

        //check if chat exists
        const chatExists = Chat.findOne({ _id: chatId });
        if (!chatExists) {
            return res.status(400).json({
                success: false,
                message: 'Chat does not exists'
            });
        }

        const newMessage = {
            senderId,
            recieverId,
            message,
            chatId
        }
        const msgCreated = await Message.create(newMessage)
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
                    path: 'users.userId',
                    select: '-password -__v'
                }
            })
        return res.status(200).json({ success: true, message: 'message Added successfully', chat: { chatId, sender, reciever, message } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, });
    }
}
module.exports = sendMessage;