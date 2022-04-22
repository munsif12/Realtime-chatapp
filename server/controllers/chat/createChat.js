const createChat = async (req, res) => {
    const { userId } = req.body;
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User Id required'
            });
        }


        const chat = await Chat.create({
            userId
        });
        return res.status(200).json({
            success: true,
            message: 'create chat',
            chat
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = createChat;