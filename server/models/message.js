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

const Message = mongoose.model("message", messageSchema);
module.exports = Message;