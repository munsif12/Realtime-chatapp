
const User = require('../../models/user');
const users = async (req, res) => {
    let SearchQuery = {
        _id: { $ne: req.user._id } //dont include the curret login user
    }
    const { search } = req.query;
    if (search) {
        SearchQuery['$or'] = [{
            name: { $regex: search, $options: 'i' },
            email: { $regex: search, $options: 'i' }
        }]
    }

    const users = await User.find(SearchQuery).select("-password -__v");
    return res.status(200).json({
        success: true,
        users
    })
}
module.exports = users;