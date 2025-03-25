// Frontend - React App (App.js)

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000"); // Connect to backend

const App = () => {
    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');
    const [note, setNote] = useState('');
    const [users, setUsers] = useState([]);
    const [joined, setJoined] = useState(false);

    const joinRoom = () => {
        if (room && username) {
            socket.emit("joinRoom", { room, username });
            setJoined(true);
        }
    };

    useEffect(() => {
        socket.on("loadNote", (content) => setNote(content));
        socket.on("noteUpdated", (content) => setNote(content));
        socket.on("userList", (users) => setUsers(users));
    }, []);

    const handleEdit = (e) => {
        setNote(e.target.value);
        socket.emit("editNote", { room, content: e.target.value });
    };

    return (
        <div>
            {!joined ? (
                <div>
                    <input type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Enter room" onChange={(e) => setRoom(e.target.value)} />
                    <button onClick={joinRoom}>Join</button>
                </div>
            ) : (
                <div>
                    <h2>Room: {room}</h2>
                    <textarea value={note} onChange={handleEdit}></textarea>
                    <h3>Users in Room:</h3>
                    <ul>
                        {users.map((user, index) => (<li key={index}>{user}</li>))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
