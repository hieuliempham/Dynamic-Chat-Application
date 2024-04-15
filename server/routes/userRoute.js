const express = require('express');
const {registerUser, loginUser, findUser, getUsers, forgotpassword, changepassword, resetpassword} = require('../controllers/userController');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.post('/forgotpassword', forgotpassword);
router.post('/changepassword', changepassword);
router.post('/resetpassword/:token', resetpassword);


module.exports = router;