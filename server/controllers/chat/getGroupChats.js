const Chat = require("../../models/chat");
const { detailsToSelect } = require("../../constants");
const getGroupChats = async (req, res) => {
    //to get group Chats
    try {
        const chats = await Chat.find({
            isGroupChat: true,
            $or: [
                { users: { $in: [req.user._id] } },
                { groupAdmin: { $eq: req.user._id } }
            ]
        })
            .populate({
                path: 'users',
                select: detailsToSelect
            })
            .populate({
                path: 'latestMessage',
                populate: {
                    path: 'senderId',
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
module.exports = getGroupChats;