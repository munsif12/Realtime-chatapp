const { detailsToSelect } = require("../../constants");
const Chat = require("../../models/chat");
const ObjectId = require('mongoose').Types.ObjectId;
const removeFromGroupChat = async (req, res) => {
    try {
        const { userId, groupChatId } = req.body;
        if (!userId || !groupChatId) {
            return res.status(400).json({ success: false, message: 'User Id or Group Chat Id required' });
        }
        //if user not present in he chat
        const isUserAlreadyInGroupChat = await Chat.findOne({ _id: groupChatId, users: { $in: ObjectId(userId) } });
        if (!isUserAlreadyInGroupChat) {
            return res.status(400).json({ success: false, message: 'User not exists in this grouy chat' });
        }
        let groupChat = await Chat.findByIdAndUpdate({ _id: groupChatId }, { $pull: { users: userId } }, { new: true })
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
        if (!groupChat) {
            return res.status(500).json({ success: false, message: 'Chat Removing  failed' });
        }
        return res.status(200).json({ success: true, message: 'User removed successfully', chat: groupChat });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = removeFromGroupChat;