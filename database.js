const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./blog.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `);
});

app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY id DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const date = new Date().toISOString();

  if (!title || !content) {
    res.status(400).json({ error: 'Title and content required' });
    return;
  }

  const stmt = db.prepare('INSERT INTO posts (title, content, date) VALUES (?, ?, ?)');
  stmt.run(title, content, date, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, title, content, date });
  });
  stmt.finalize();
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
