const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (req, res, io) => {
    try {
        const { username, password, display_name, phone_number, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, display_name, phone_number, email });

        // Emit an event to notify clients about the new user
        io.emit('userCreated', user);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res, io) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Emit an event to notify clients about the user logging in
        io.emit('userLoggedIn', { username });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findByUsername(req.query.username);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUsername = async (req, res) => {
    try {
        const { currentUsername, newUsername } = req.body;
        const user = await User.updateUsername(currentUsername, newUsername);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDisplayName = async (req, res) => {
    try {
        const { username, display_name } = req.body;
        const user = await User.updateDisplayName(username, display_name);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEmail = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.updateEmail(username, email);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePhoneNumber = async (req, res) => {
    try {
        const { username, phone_number } = req.body;
        const user = await User.updatePhoneNumber(username, phone_number);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.delete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
