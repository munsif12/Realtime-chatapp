const mongoose = require("mongoose");
const { Schema } = mongoose
const chatModel = Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        groupChatImage: String,
        users: [{ type: Schema.Types.ObjectId, ref: "user" }],
        latestMessage: { type: Schema.Types.ObjectId, ref: "message" },
        groupAdmin: { type: Schema.Types.ObjectId, ref: "user" },
    },
    {
        timestamps: true
    }
);



chatModel.pre(/^find/, function (next) {
    console.log(this.chatName);
    this.populate({
        path: 'users',
        select: "_id name email profileImage"
    }).populate({
        path: 'groupAdmin',
        select: "_id name email profileImage"
    })

    if (this.latestMessage && this.latestMessage.message) {
        // Latest message already populated  
        next();
        return;
    }

    // this.populate({
    //     path: 'latestMessage',
    //     populate: {
    //         path: 'senderId recieverId',
    //         select: '-password -__v'
    //     }
    // })

    next();
})

const Chat = mongoose.model("chat", chatModel);
module.exports = Chat;