const { detailsToSelect } = require("../../constants");
const Chat = require("../../models/chat");
const Message = require("../../models/message");
const createChat = async (req, res) => {
    //will take chatid if  not exists then it will create a new chat else will return the existed chat
    const { userId } = req.body;
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User Id required'
            });
        }
        //if chat already exists then populate and return 
        let chatAlreadyExists = await Chat.findOne({
            isGroupChat: false,
            users: {
                $all: [userId, req.user._id] //if both users are present in chat 
            }
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

        if (chatAlreadyExists) {
            return res.status(200).json({
                success: true,
                message: 'Chat already exists',
                chat: chatAlreadyExists
            });
        }

        //else if chat does not exist create a new chat and return
        let newChat = await Chat.create({
            chatName: 'one-to-one',
            isGroupChat: false,
            users: [userId, req.user._id]
        });

        if (!newChat) {
            return res.status(500).json({
                success: false,
                message: 'Chat creation failed'
            });
        }

        //chat is created now populate the user array inside Chat and return to the user
        newChat = await Chat.findOne({ _id: newChat._id })
            .populate({
                path: 'users',
                select: detailsToSelect
            })

        return res.status(200).json({
            success: true,
            message: 'Chat created',
            chat: newChat
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = createChat;