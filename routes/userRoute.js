const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const session = require('express-session');

const user_route = express();
const {SESSION_SECRET} = process.env;
user_route.use(session({secret: SESSION_SECRET}));

user_route.set('view engine', 'ejs');
user_route.set('views', path.join(__dirname, '..', 'views'));


user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));
user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename:function(req, file, cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({storage:storage});


// Dang ky
user_route.get('/register', userController.registerLoad);
user_route.post('/register',upload.single('image'), userController.register);

// Dang nhap
user_route.get('/', userController.loadLogin);
user_route.post('/', userController.login);
user_route.get('/logout', userController.logout);

// dashboard
user_route.get('/dashboard', userController.loadDashboard);

user_route.get('*', function(req, res){
    res.redirect("/");
})

module.exports = user_route;
