// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/error');
const sessionlink = require('./routes/sessionroute');
const connectDatabase = require('./config/database');

dotenv.config({ path: path.join(__dirname, 'config/config.env') });
connectDatabase();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach socket.io to the HTTP server

// WebRTC signaling logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('join-session', (sessionId) => {
      socket.join(sessionId);
      socket.to(sessionId).emit('user-connected', socket.id);
  
      socket.on('offer', (data) => {
        io.to(data.sessionId).emit('offer', { offer: data.offer, from: socket.id });
      });
  
      socket.on('answer', (data) => {
        io.to(data.sessionId).emit('answer', { answer: data.answer, to: data.to });
      });
  
      socket.on('ice-candidate', (data) => {
        io.to(data.sessionId).emit('ice-candidate', { candidate: data.candidate, to: data.to });
      });
  
      socket.on('disconnect', () => {
        socket.to(sessionId).emit('user-disconnected', socket.id);
      });
    });
  });
  
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/v1/', sessionlink);

// Error Middleware
app.use(errorMiddleware);

// Start server
server.listen(process.env.PORT, () => {
  console.log(`My Server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
