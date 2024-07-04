const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

module.exports = (io) => {
    router.post('/register', (req, res) => userController.createUser(req, res, io));
    router.post('/login', (req, res) => userController.loginUser(req, res, io));
    router.get('/', userController.getUsers);
    router.get('/byusername', userController.getUserByUsername);
    router.put('/update-username', userController.updateUsername);
    router.put('/update-displayname', userController.updateDisplayName);
    router.put('/update-email', userController.updateEmail);
    router.put('/update-phone', userController.updatePhoneNumber);
    router.delete('/:id', userController.deleteUser);
    return router;
};
