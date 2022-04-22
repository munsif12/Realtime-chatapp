const getChats = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'create chat'
    })

}
module.exports = getChats;