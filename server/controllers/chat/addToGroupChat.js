const Chat = require("../../models/chat");
const { detailsToSelect } = require("../../constants");
const ObjectId = require('mongoose').Types.ObjectId;
const addToGroupChat = async (req, res) => {
    try {
        const { userId, groupChatId } = req.body;
        if (!userId || !groupChatId) {
            return res.status(400).json({ success: false, message: 'User Id or Group Chat Id required' });
        }
        //if user already present inthe chat then dont add
        const isUserAlreadyInGroupChat = await Chat.findOne({ _id: groupChatId, users: { $in: ObjectId(userId) } });
        if (isUserAlreadyInGroupChat) {
            return res.status(400).json({ success: false, message: 'User already in group chat' });
        }

        let groupChat = await Chat.findByIdAndUpdate({ _id: groupChatId }, { $push: { users: userId } }, { new: true })
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
            return res.status(500).json({ success: false, message: 'User Adding failed' });
        }
        return res.status(200).json({ success: true, message: 'User Added successfully', chat: groupChat });
    } catch (error) {

    }
}
module.exports = addToGroupChat;