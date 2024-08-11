const http = require('http');
const WebSocket = require('ws');
const app = require('./app');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Handle incoming messages (e.g., signaling messages)
    console.log('Received message:', message);
  });

  ws.send('Connected to WebSocket server');
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
