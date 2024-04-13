const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        let user = await userModel.findOne({email});

        if(user)
            return res.status(400).json("Email này đã tồn tại!");

        if(!name, !email, !password)
            return res.status(400).json("Yêu cầu nhập đầy đủ thông tin!");

        if(!validator.isEmail(email))
            return res.status(400).json("Email sai định dạng!");
        
        if (!validator.isStrongPassword(password)) 
            return res.status(400).json({ message: "Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ cái (in hoa và in thường), số, và ký tự đặc biệt." });
        
        user = new userModel({name, email, password});
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name, email, token});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }  
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await userModel.findOne({email});

        if(!user)
            return res.status(400).json("Email hoặc mật khẩu sai!");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword)
            return res.status(400).json("Email hoặc mật khẩu sai!");

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name : user.name, email, token});

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async (req, res) =>{
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getUsers = async (req, res) =>{

    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers,
}