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

const loadLogin = async(req, res)=>{
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const login = async(req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email: email});
        if (userData) {
                const passwordMatch = bcrypt.compare(password, userData.password);
                if(passwordMatch){
                    req.session.user = userData;
                    res.redirect('/dashboard');
                }else{
                    res.render('login', { message: "Email hoặc Password không chính xác"});
                }
        }else{
            res.render('login', { message: "Email hoặc Password không chính xác"});
        }
    } catch (error) {
        console.log(error.message);
    }
}
const logout = async(req, res)=>{
    try {
        req.session.destroy();
        res.redirect('/');
        
    } catch (error) {
        console.log(error.message);
    }
}
const loadDashboard = async(req, res)=>{
    try {
        res.render('dashboard', {user: req.session.user})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    registerLoad,
    register,
    loadLogin,
    login,
    logout,
    loadDashboard
}