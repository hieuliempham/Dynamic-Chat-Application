const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Chat', chatSchema)