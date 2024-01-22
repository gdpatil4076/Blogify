const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server , {
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET" , "POST"],
    }
});




io.on('connection', (socket) => { 
  console.log('A user connected with ID : ' , socket.id );
  // Handle events from the client
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
