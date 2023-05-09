const Chat = require("../../models/chat");
const { detailsToSelect } = require("../../constants");
const getChats = async (req, res) => {
    //to get one-to-one Chats
    try {
        console.log('time to get chats');
        const chats = await Chat.find({ users: { $in: [req.user._id] } })
            .sort({ createdAt: -1 });
        console.log('chats', chats.length);
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