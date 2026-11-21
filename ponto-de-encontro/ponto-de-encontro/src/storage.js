const fs = require('fs/promises');
const path = require('path');
const DATA_FILE = path.join(__dirname, '..', 'data', 'messages.json');
async function loadMessages() {
  try { const parsed = JSON.parse(await fs.readFile(DATA_FILE, 'utf8')); return Array.isArray(parsed) ? parsed : []; }
  catch (error) { if (error.code === 'ENOENT') return []; console.error('Erro ao ler histórico:', error); return []; }
}
async function saveMessage(message) {
  const messages = await loadMessages(); messages.push(message);
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), 'utf8');
}
module.exports = { loadMessages, saveMessage };
