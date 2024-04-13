const messageModel = require("../models/messageModel");

//createMessage
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//getMessage
const getMessage = async (req, res) => {
  const { chatId } = req.params; 
  // console.log(chatId);

  try {
    const messages = await messageModel.find({ chatId });
    // console.log(messages);
    res.status(200).json(messages);
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = { createMessage, getMessage };
