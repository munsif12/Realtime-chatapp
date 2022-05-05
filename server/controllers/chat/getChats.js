const Chat = require("../../models/chat");
const { detailsToSelect } = require("../../constants");
const getChats = async (req, res) => {
    //to get one-to-one Chats
    try {
        const chats = await Chat.find({ users: { $in: [req.user._id] } })
            .populate({
                path: 'users',
                select: detailsToSelect
            })
            .populate({
                path: 'latestMessage',
                populate: {
                    path: 'senderId recieverId',
                    select: '-password -__v'
                }
            })
            .populate({
                path: 'groupAdmin',
                select: detailsToSelect
            })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            chats
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
module.exports = getChats;