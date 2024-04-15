const chatModel = require("../models/chatModel");

const createGroup = async (req, res) => {
  try {
    const { members } = req.body;
    const newChat = new chatModel({ members });
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;
    const updatedChat = await chatModel.findByIdAndUpdate(
      chatId,
      { $addToSet: { members: userId } },
      { new: true }
    );
    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;
    const updatedChat = await chatModel.findByIdAndUpdate(
      chatId,
      { $pull: { members: userId } },
      { new: true }
    );
    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroup = async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await chatModel.findById(chatId);
      res.json(chat);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// lay danh sach nhom cua 1 thanh vien
const getGroupFromUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const chats = await chatModel.find({ members: userId });
      res.json(chats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { createGroup, addMember, removeMember, getGroup, getGroupFromUser };
