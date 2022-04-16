const res = require('express/lib/response');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true,
        default: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_960_720.png'
    }
}, {
    timestamps: true,
    // toJSON: {
    //     virtuals: true,
    //     transform: (doc, ret) => {
    //         delete ret.password;
    //         return ret;
    //     }
    // }
});

userSchema.methods.bcryptComparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'User Password hashing error' });
    }
}
userSchema.methods.sanitize = function () {
    let { password, __v, ...rest } = this;
    return rest;
}

//schema middlewares
userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) { //if new user --> dont hash while updating
            console.log(this)
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'User Password hashing error' });
    }
});


const User = mongoose.model('user', userSchema);




module.exports = User;