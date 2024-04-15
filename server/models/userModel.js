const mongoose = require('mongoose');
const  crypto = require('crypto');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        email:{
            type: String,
            require: true,
            minlength: 3,
            maxlength: 200, 
            unique: true,
        },
        password:{
            type: String, 
            required: true,
            minlength: 3,
            maxlength: 1024
        },
        status: {
            type: Boolean,
            default: true
        },
        ResetPasswordToken: String,
        ResetPasswordTokenExp: String
    },
    {
        timestamps: true
    }
);
userSchema.pre('save', function () {
    if(this.isModified("password")){
        this.password = bcrypt.hashSync(this.password, 10);
    }
})

userSchema.methods.genRestPasswordToken = function () {
    this.ResetPasswordToken = crypto.randomBytes(30).toString('hex');
    this.ResetPasswordTokenExp = Date.now() + 10 * 60 * 1000;
    return this.ResetPasswordToken;
}

userSchema.methods.comparePassword =  function(candidatePassword){
    try {
        return bcrypt.compareSync(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model('User', userSchema)