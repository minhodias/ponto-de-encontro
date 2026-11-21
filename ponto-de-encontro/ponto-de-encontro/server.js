const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const { loadMessages, saveMessage } = require('./src/storage');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3000;
const ROOMS = ['Café', 'Estudos', 'Ideias', 'Livre'];
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/rooms', (_req, res) => res.json(ROOMS));
function broadcast(packet, room) {
  const data = JSON.stringify(packet);
  for (const client of wss.clients) if (client.readyState === WebSocket.OPEN && client.room === room) client.send(data);
}
wss.on('connection', async socket => {
  socket.room = 'Café'; socket.username = 'Visitante';
  socket.send(JSON.stringify({ type: 'history', room: socket.room, messages: (await loadMessages()).filter(m => m.room === socket.room).slice(-60) }));
  socket.on('message', async raw => {
    let packet; try { packet = JSON.parse(raw.toString()); } catch { return; }
    if (packet.type === 'join') {
      const name = String(packet.name || '').trim().slice(0, 24);
      const room = ROOMS.includes(packet.room) ? packet.room : 'Café';
      if (!name) return;
      socket.username = name; socket.room = room;
      socket.send(JSON.stringify({ type: 'history', room, messages: (await loadMessages()).filter(m => m.room === room).slice(-60) }));
      broadcast({ type: 'notice', text: `${name} entrou na sala` }, room);
    } else if (packet.type === 'message') {
      const text = String(packet.text || '').trim().slice(0, 1000); if (!text) return;
      const message = { id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, name: socket.username, room: socket.room, text, at: new Date().toISOString() };
      await saveMessage(message); broadcast({ type: 'message', message }, socket.room);
    }
  });
});
server.listen(PORT, () => console.log(`Ponto de Encontro disponível em http://localhost:${PORT}`));
