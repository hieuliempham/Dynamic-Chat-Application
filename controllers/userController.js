const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const path = require('path');

const registerLoad = async(req, res)=>{
    try {
        res.render('register')
        
    } catch (error) {
        console.log(error.message);
    }
}

const register = async(req, res)=>{
    try {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        
        const user = new User({
            name:   req.body.name,
            email: req.body.email,
            image: 'images/' + req.file.filename,
            password: passwordHash
        });

        user.save();

        res.render('register', 
        {
            message: 'Đăng ký thành công!'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    registerLoad,
    register
}