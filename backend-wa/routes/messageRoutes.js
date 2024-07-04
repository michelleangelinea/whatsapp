const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

module.exports = (io) => {
    router.post('/', (req, res) => messageController.createMessage(req, res, io));
    router.get('/', messageController.getMessages);
    router.get('/byid', messageController.getMessageById); // Use req.query for get by id
    router.put('/', messageController.updateMessage); // Use req.query for update
    router.delete('/:id', messageController.deleteMessage);
    return router;
};
