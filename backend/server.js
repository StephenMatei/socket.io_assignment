// server.js - Express & Socket.io Backend with MongoDB

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Note Schema & Model
const NoteSchema = new mongoose.Schema({
    room: String,
    content: String
});
const Note = mongoose.model("Note", NoteSchema);

const users = {}; // Store users per room

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("joinRoom", async ({ room, username }) => {
        socket.join(room);
        if (!users[room]) users[room] = [];
        users[room].push({ id: socket.id, username });
        io.to(room).emit("userList", users[room].map(u => u.username));
        
        let note = await Note.findOne({ room });
        socket.emit("loadNote", note ? note.content : "");
    });

    socket.on("editNote", async ({ room, content }) => {
        await Note.findOneAndUpdate({ room }, { content }, { upsert: true });
        socket.to(room).emit("noteUpdated", content);
    });

    socket.on("disconnect", () => {
        for (let room in users) {
            users[room] = users[room].filter(user => user.id !== socket.id);
            io.to(room).emit("userList", users[room].map(u => u.username));
        }
        console.log("User disconnected");
    });
});

server.listen(5000, () => console.log("Server running on port 5000"));
