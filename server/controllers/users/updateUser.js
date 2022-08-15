const User = require('../../models/user');
const users = async (req, res) => {
    try {
        // update user name
        const { user: { _id }, body: { name, about } } = req;
        const user = await User.findById({ _id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if (name) {
            user.name = name;
            await user.save();
        }
        // update user about
        if (about) {
            user.about = req.body.about;
            await user.save();
        }
        //return success response
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: 'Server Error' })

    }
}
module.exports = users;