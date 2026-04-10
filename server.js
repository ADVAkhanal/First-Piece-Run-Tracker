const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Data store ────────────────────────────────────────────────────────────────
// On Railway, the filesystem is ephemeral between deploys. For true persistence
// across redeploys, add a Railway Volume (free) and set DATA_DIR=/data in env vars.
// Without a volume, data survives restarts but NOT new deploys.
const DATA_DIR  = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'entries.json');

if (!fs.existsSync(DATA_DIR))  fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

function readEntries() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
}

function writeEntries(entries) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── API ───────────────────────────────────────────────────────────────────────
app.get('/api/entries', (req, res) => {
  res.json(readEntries());
});

app.post('/api/entries', (req, res) => {
  const entries = readEntries();
  const entry = { ...req.body, id: Date.now() };
  entries.unshift(entry);
  writeEntries(entries);
  res.json(entry);
});

app.put('/api/entries/:id', (req, res) => {
  const entries = readEntries();
  const idx = entries.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  entries[idx] = { ...entries[idx], ...req.body };
  writeEntries(entries);
  res.json(entries[idx]);
});

app.delete('/api/entries/:id', (req, res) => {
  let entries = readEntries();
  const before = entries.length;
  entries = entries.filter(e => e.id !== Number(req.params.id));
  if (entries.length === before) return res.status(404).json({ error: 'Not found' });
  writeEntries(entries);
  res.json({ ok: true });
});

app.delete('/api/entries', (req, res) => {
  writeEntries([]);
  res.json({ ok: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`FPY Tracker running on port ${PORT}`);
  console.log(`Data file: ${DATA_FILE}`);
});
