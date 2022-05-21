
const Chat = require("../../models/chat");
const { detailsToSelect } = require("../../constants");
const createGropuChat = async (req, res) => {
    //will take chatname nad userIds and will set groupAdmin value to logedin user
    try {
        const { chatName, userIds, groupChatImage } = req.body;
        if (!chatName || !userIds) {
            return res.status(400).json({
                success: false,
                message: 'Chat name and user ids required'
            });
        }

        if (userIds.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Minimum 2 users required to create a group chat'
            });
        }
        //if chat whis this name already exists
        const groupChatExists = await Chat.findOne({
            isGroupChat: true,
            chatName
        })

        if (groupChatExists) {
            return res.status(400).json({
                success: false,
                message: 'Chat name already exists',
            });
        }

        //create new gropuChat
        let newGroupChat = await Chat.create({
            chatName,
            isGroupChat: true,
            groupChatImage,
            users: userIds,
            groupAdmin: req.user._id
        })
        if (!newGroupChat) {
            return res.status(500).json({
                success: false,
                message: 'Group chat creation failed'
            });
        }
        //gropuchat is created now populate the user array inside Chat and return to the user
        newGroupChat = await Chat.findOne({ _id: newGroupChat._id })
            .populate({
                path: 'users',
                select: detailsToSelect
            })
            .populate({
                path: 'groupAdmin',
                select: detailsToSelect
            })
        return res.status(200).json({
            success: true,
            message: 'Group chat created successfully',
            chat: newGroupChat
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

module.exports = createGropuChat;