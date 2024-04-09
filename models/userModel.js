const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    is_online:{
        type: String,
        default: '0'
    },
},
{
    timestamps: true}
);

module.exports = mongoose.Model('User', userSchema)