const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageSchema = Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: "user" },
        message: { type: String, trim: true },
        chatId: { type: Schema.Types.ObjectId, ref: "chat" },
        recieverId: [{ type: Schema.Types.ObjectId, ref: "user" }],
        star: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);
module.exports = Message;