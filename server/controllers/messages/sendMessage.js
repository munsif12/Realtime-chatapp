const Message = require('../../models/message');
const Chat = require('../../models/chat');
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
        const chatExists = await Chat.findOne({ _id: chatId });
        if (!chatExists) {
            return res.status(400).json({
                success: false,
                message: 'Chat does not exists'
            });
        }

        //create new mesage now
        const newMessage = {
            senderId,
            recieverId,
            message,
            chatId
        }
        const msgCreated = await Message.create(newMessage);
        if (!msgCreated) {
            return res.status(400).json({
                success: false,
                message: 'Message not created'
            });
        }

        const msg = await Message.findOne({ _id: msgCreated._id })
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
            });
        //now update the chat with the lastest message
        await Chat.findByIdAndUpdate({ _id: chatId }, { latestMessage: msg._id }, { new: true });

        return res.status(200).json({ success: true, message: 'Message created successfully', message: msg });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, });
    }
}
module.exports = sendMessage;