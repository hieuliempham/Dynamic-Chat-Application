const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const cookieParser = require('cookie-parser');



const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


app.get("/", (req, res) =>{
    res.send("Welconme")
})


const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;


app.listen(port, (req, res)=>{
    console.log(`Server running on port: ${port}`);
});

// Kết nối đến MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection failed:', err));
