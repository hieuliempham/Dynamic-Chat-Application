const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        Timestamp: true,
    }
);
module.exports = mongoose.model('Chat', chatSchema)