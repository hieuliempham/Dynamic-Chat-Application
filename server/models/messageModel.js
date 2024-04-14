const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        text: String,
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Message', messageSchema)