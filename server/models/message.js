const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageSchema = Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: "user" },
        message: { type: String, trim: true },
        chatId: { type: Schema.Types.ObjectId, ref: "chat" },
        recieverId: [{ type: Schema.Types.ObjectId, ref: "user" }],
        stars: [{ type: Schema.Types.ObjectId, ref: "user" }]
    },
    { timestamps: true }
);
let count = 1;
messageSchema.pre(/^find/, function (next) {
    console.log('messageSchema pre find middleware', count++, this.message);
    this.populate({
        path: 'senderId',
        select: '-password -__v'
    })
        .populate({
            path: 'recieverId',
            select: '-password -__v'
        })
        .populate({
            path: 'chatId',
            populate: {
                path: 'users',
                select: '-password -__v'
            }
        });
    next();
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;