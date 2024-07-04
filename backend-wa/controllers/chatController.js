const Chat = require('../models/Chat');

exports.createChat = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.body;
        const chat = await Chat.create({ sender_id, receiver_id });
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.findAll();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChatById = async (req, res) => {
    try {
        const { id } = req.query; // Use req.query for get
        const chat = await Chat.findById(id);
        if (!chat) {
            res.status(404).json({ message: 'Chat not found' });
        } else {
            res.status(200).json(chat);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateChat = async (req, res) => {
    try {
        const { id, sender_id, receiver_id } = req.query; // Use req.query for update
        const chat = await Chat.update(id, { sender_id, receiver_id });
        if (!chat) {
            res.status(404).json({ message: 'Chat not found' });
        } else {
            res.status(200).json(chat);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.delete(id);
        if (!chat) {
            res.status(404).json({ message: 'Chat not found' });
        } else {
            res.status(200).json(chat);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
