const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

module.exports = (io) => {
    router.post('/', (req, res) => chatController.createChat(req, res, io));
    router.get('/', chatController.getChats);
    router.get('/byid', chatController.getChatById); // Use req.query for get by id
    router.put('/', chatController.updateChat); // Use req.query for update
    router.delete('/:id', chatController.deleteChat);
    return router;
};
