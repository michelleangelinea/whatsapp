const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const pool = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoutes(io));
app.use('/chat', chatRoutes(io));
app.use('/message', messageRoutes(io));

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Example event handling
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});