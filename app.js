require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatApp')

const app = require('express')();
const http = require('http').Server(app);

http.listen(3000, ()=>{
    console.log('Server is running at port 3000');
})