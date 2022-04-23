const Chat = require("../../models/chat");
const { detailsToSelect } = require("../../constants");
const renameGroupChat = async (req, res) => {
    try {
        const { groupChatId, groupChatName } = req.body;
        if (!groupChatId || !groupChatName) {
            return res.status(400).json({ success: false, message: 'Chat Id  or  Chat Name required' });
        }
        let groupChat = await Chat.findByIdAndUpdate({ _id: groupChatId }, { $set: { chatName: groupChatName } }, { new: true })
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
            return res.status(500).json({ success: false, message: 'Chat renaming failed' });
        }
        return res.status(200).json({ success: true, message: 'Chat renamed successfully', chat: groupChat });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = renameGroupChat;