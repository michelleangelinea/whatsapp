const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
    try {
        const { chat_id, sender_id, content } = req.body;
        const message = await Message.create({ chat_id, sender_id, content });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const { id } = req.query; // Use req.query for get
        const message = await Message.findById(id);
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
        } else {
            res.status(200).json(message);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const { id, content } = req.query; // Use req.query for update
        const message = await Message.update(id, { content });
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
        } else {
            res.status(200).json(message);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.delete(id);
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
        } else {
            res.status(200).json(message);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
