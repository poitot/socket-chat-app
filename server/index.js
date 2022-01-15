const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origins:["127.0.0.1"]
    }
});
const cors = require('cors');

app.use(cors());
console.log("hello world");
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("receive-chat-msg", "hello");
    socket.on('message', (msg) => {
        console.log(msg);
        socket.emit("receive-chat-msg", msg)
    }
    );
});


server.listen(8080, () => {  console.log('listening on *:8080');});

