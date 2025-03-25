Real-Time Collaborative Notes App

Overview

This project is a real-time collaborative notes application built using the MERN stack with Socket.io for WebSocket communication. It allows multiple users to join rooms, create, edit, and view notes in real time.

Features

Users can join a specific room to collaborate on a shared note.

Real-time updates when another user edits the note.

Ability to create new notes and edit existing ones.

Notifications when a new user joins or leaves a room.

List of active users in each room.

Technologies Used

Backend:

Node.js + Express.js (Server-side framework)

Socket.io (Real-time communication)

CORS & JSON Middleware

Frontend:

React (UI Framework)

Socket.io Client (WebSockets integration)

React Hooks & Context API (State management)

Installation & Setup

Prerequisites:

Ensure you have Node.js and npm installed.

Backend Setup:

cd real-time-notes-backend
npm install
npm start

Server will run on http://localhost:5000.

Frontend Setup:

cd real-time-notes-frontend
npm install
npm run dev

Frontend will run on http://localhost:5173 (Vite default).

Usage

Enter a username and room name.

Click Join to start collaborating.

Edit the note and see real-time updates.

View the list of active users in the room.

Deployment

Backend: Deployed on Render

Frontend: Deployed on Vercel

Contributors

[Your Name]

License

This project is licensed under the MIT License.