const Message = require('../../models/message');
const getAllStarredMessages = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        //give all message where stars array contains userId
        const messages = await Message.find({ stars: userId })

        const starredMessages = await Message.find({ stars: userId })
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
        return res.status(200).json({
            success: true,
            message: 'Chat messages send successfully',
            starredMessages
        })
    } catch (error) {
        return res.status(500).json({ success: true, message: error.message });
    }
}
module.exports = getAllStarredMessages;